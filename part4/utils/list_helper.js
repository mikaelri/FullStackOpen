const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => Number(blog.likes)))
  const targetBlog = blogs.find( blog => Number(blog.likes) === maxLikes)

  return ( {
    title: targetBlog.title,
    author: targetBlog.author,
    likes: targetBlog.likes,
    url: targetBlog.url
  })

}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const author_with_most_blogs = _.findKey(authors, (value) => {
    return value === _.max(_.values(authors))
  })
  const author_with_most_blogs_amount = _.find(authors, (value) => {
    return value === _.max(_.values(authors))
  })

  return ( {
    author: author_with_most_blogs,
    blogs: author_with_most_blogs_amount
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}