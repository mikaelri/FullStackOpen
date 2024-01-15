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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}