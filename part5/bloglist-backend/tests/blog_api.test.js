const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogs_api_test_helper')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

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

    const user = await User.findOne({})
    const tokenUser = {
      username: user.username,
      id: user.id
    }

    const Token = jwt.sign(tokenUser, process.env.SECRET)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${Token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Some random testing title')
  })

  test('if "likes" is not added to the body it is by default 0', async () => {

    const user = await User.findOne({})
    const tokenUser = {
      username: user.username,
      id: user.id
    }

    const Token = jwt.sign(tokenUser, process.env.SECRET)

    const newBlog = {
      title: 'Some random testing title',
      author: 'Some random Tester',
      url: 'somerandomurl.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${Token}`)
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

    const user = await User.findOne({})
    const tokenUser = {
      username: user.username,
      id: user.id
    }

    const Token = jwt.sign(tokenUser, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${Token}`)
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

    const user = await User.findOne({})
    const tokenUser = {
      username: user.username,
      id: user.id
    }

    const Token = jwt.sign(tokenUser, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${Token}`)
      .send(newBlogWithoutUrl)
      .expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('is unsuccesfull with status code 401 if token is not included', async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)

    const user = new User ({ username: 'root', name: 'testname', passwordHash })
    await user.save()

    const testingUser = await User.findOne(user)

    const tokenUser = {
      username: testingUser.username,
      id: testingUser._id,
    }

    const newBlog = {
      title: 'test blog2',
      author: 'test author2',
      url: 'testurl.com2',
      likes: '12',
      userId: tokenUser.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  describe('deleting a blog', () => {
    test('is succesful with status code 204 if id is valid', async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User ({ username: 'root', name: 'testname', passwordHash })

      await user.save()

      const testingUser = await User.findOne(user)

      const tokenUser = {
        username: testingUser.username,
        id: testingUser._id,
      }

      const Token = jwt.sign(tokenUser, process.env.SECRET)
      const bearerToken = 'Bearer ' + Token
      const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'testurl.com',
        likes: '1',
        userId: tokenUser.id
      }

      await Blog.deleteMany({})
      await api
        .post('/api/blogs')
        .set('Authorization', bearerToken)
        .send(newBlog)
      const blogsAll = await api.get('/api/blogs')
      const idToDelete = blogsAll.body[0].id

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', bearerToken)
        .expect(204)

      const blogsAllAfterDeletion = await api.get('/api/blogs')
      expect(blogsAllAfterDeletion.body).toHaveLength(0)
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