import React, { useState } from "react"

const Blog = ({ blogs}) => {
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
                {blog.likes} <button>like</button>
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
