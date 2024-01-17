const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blogs_api_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('when there is some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs is found from the list of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when viewing blogs', () => {
  test('blogs have a field named "id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('adding a new blog', () => {
  test('valid blog can be added', async () => {
    const newBlog = {
      title: 'Some random testing title',
      author: 'Some random Tester',
      url: 'somerandomurl.com',
      likes: 16,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Some random testing title')
  })

  test('if "likes" is not added to the body it is by default 0', async () => {
    const newBlog = {
      title: 'Some random testing title',
      author: 'Some random Tester',
      url: 'somerandomurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(0)
  })

  test('if "title" is not added, response is 400 error', async () => {
    const newBlogWithoutTitle = {
      author: 'Some random Tester',
      url: 'somerandomurl.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('if "url" is not added, response is 400 error', async () => {
    const newBlogWithoutUrl = {
      title: 'Some random title',
      author: 'Some random Tester',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  describe('deleting a blog', () => {
    test('is succesful with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]


      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      expect(contents).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('is succesful with status code 200 if update is valid', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogIdToUpdate = blogsAtStart.body[0].id

      const blogUpdated =
        {
          title: 'This is one test for put method',
          author: 'Updated author put test',
          url: 'ThisIsAUpdate.com',
          likes: 10
        }

      await api
        .put(`/api/blogs/${blogIdToUpdate}`)
        .send(blogUpdated)
        .expect(200)

      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.title)

      expect(response.body).toHaveLength(blogsAtStart.body.length)
      expect(contents).toContain('This is one test for put method')
    })
  })

  describe('updating a blog', () => {
    test('is failed with status code 400 if the update is invalid (i.e. missing url)', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogIdToUpdate = blogsAtStart.body[0].id

      const blogUpdated =
      {
        title: 'This is one test for put method',
        author: 'Updated author put test',
        url: '',
        likes: 10
      }

      await api
        .put(`/api/blogs/${blogIdToUpdate}`)
        .send(blogUpdated)
        .expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(blogsAtStart.body.length)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})