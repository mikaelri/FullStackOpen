const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {

  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'user id not authorized to delete a blog' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter