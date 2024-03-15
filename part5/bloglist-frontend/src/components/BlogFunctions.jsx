import React, { useState } from 'react'
import blogservice from '../services/blogs'

const Blog = ({ blogs, setNewBlogs, handleBlogMessage, user }) => {
  const [visible, setVisible] = useState({})

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 7,
  }  

  const toggleVisibility = (id) => {
    setVisible(prevVisibleBlogs => ({
      ...prevVisibleBlogs,
      [id]: !prevVisibleBlogs[id]
    }))
  }

  const sortedBlogs = [...blogs].sort((blogA, blogB) => blogB.likes - blogA.likes)

  const updateLikes = async (event, blog) => {
    event.preventDefault()
    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    try {
      let returnedUpdatedBlog = await blogservice.update(blog.id, updatedBlogObject)
      returnedUpdatedBlog = { ...returnedUpdatedBlog, user: blog.user }
      
      const updatedBlogs = blogs.map((b) => b.id === returnedUpdatedBlog.id ? returnedUpdatedBlog: b)

      setNewBlogs(updatedBlogs)
      handleBlogMessage(`blog with title ${updatedBlogObject.title} liked`, 'success')
    }
    catch (exception) {
      console.error('Error updating blog:', exception)
      handleBlogMessage(`unable to add like for the blog with title ${updatedBlogObject.title}`, 'error')
    }
  }

  const handleBlogDelete = async (event, blog) => {
    event.preventDefault()

    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogservice.remove(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)

        setNewBlogs(updatedBlogs)
        handleBlogMessage(`Removed blog ${blog.title} by ${blog.author}`, 'success')
      }
    }
    catch (exception) {
      console.error('Error updating blog:', exception)
      handleBlogMessage(`Unable to delete blog ${blog.title}`, 'error')
    }
  }

  return (
    <div>
      {sortedBlogs.map(blog => {
        const isVisible = visible[blog.id]
        const isBlogOwner = blog.user.name === user.name

        const hideWhenVisible = { display: isVisible ? 'none' : '' }
        const showWhenVisible = { display: isVisible ? '' : 'none' }

        return (
          <div key={blog.id}style={blogStyle}>
            <div style={hideWhenVisible} className='blog-overview' data-testid='blog-overview'>
              {blog.title} {blog.author} <button onClick={() => toggleVisibility(blog.id)}>view</button>
            </div>

            <div style={showWhenVisible} className='blog-showall'>
              {blog.title} {blog.author} <button onClick={() => toggleVisibility(blog.id)}>hide</button>
            
              <div>
                {blog.url}
                <br />
                likes: {blog.likes} <button onClick={(event) => updateLikes(event, blog)}>like</button>
                <br />
                {blog.user.name}

                {isBlogOwner && 
                <div> 
                  <button onClick={(event) => handleBlogDelete(event, blog)}>remove</button>
                </div>
                }
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Blog