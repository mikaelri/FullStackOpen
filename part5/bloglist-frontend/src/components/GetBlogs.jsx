import React, { useState } from "react"
import blogservice from '../services/blogs'

const Blog = ({ blogs, setNewBlogs, handleBlogMessage }) => {
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
      user: blog.user.id
    }

    try {
      const returnedUpdatedBlog = await blogservice.update(blog.id, updatedBlogObject)
      const updatedBlogs = blogs.map((b) => b.id === returnedUpdatedBlog.id ? returnedUpdatedBlog: b)

      setNewBlogs(updatedBlogs)
      handleBlogMessage(`blog with title ${updatedBlogObject.title} liked`, 'success')
    }
    catch (exception) {
      console.error('Error updating blog:', exception);
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
      console.error('Error updating blog:', exception);
      handleBlogMessage(`Unable to delete blog ${blog.title}`, 'error')
    }
  }

  return (
    <div>
        {sortedBlogs.map(blog => {
        const isVisible = visible[blog.id]
        return (
          <div key={blog.id}style={blogStyle}>
            {blog.title} {blog.author} <button onClick={() => toggleVisibility(blog.id)}>{isVisible ? 'hide' : 'view'}
            </button>

            {isVisible && (
              <div>
                {blog.url}
                <br />
                likes: {blog.likes} <button onClick={(event) => updateLikes(event, blog)}>like</button>
                <br />
                {blog.user.name}
                <div>
                  <button onClick={(event) => handleBlogDelete(event, blog)}>remove</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default Blog