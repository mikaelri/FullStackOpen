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


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}