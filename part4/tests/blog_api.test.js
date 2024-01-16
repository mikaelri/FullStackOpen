const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testing title',
    author: 'Test Tester',
    url: 'ThisIsTestUrl.com',
    likes: 3,
  },

  {
    title: 'Another Testing title',
    author: 'Another Test Tester',
    url: 'AnotherThisIsTestUrl.com',
    likes: 5,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs is found from the list of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have a field named "id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})