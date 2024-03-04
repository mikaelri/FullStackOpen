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

  const updateLikes = async (event, blog) => {
    event.preventDefault()
    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    // 5.9 pitäisi olla valmis, tsekkaa vaan että toimii, se on tässä alla ja blogs.js:ssä update-funktio ja app.jsx:ssä uusi async await create blog //


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

  return (
    <div>
        {blogs.map(blog => {
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default Blog