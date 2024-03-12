import React, { useState } from 'react'
import blogservice from '../services/blogs'

const AddNewBlog = ({ newblog, setNewBlogs, handleBlogMessage, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {setTitle(event.target.value)}
  const handleAuthorChange = (event) => {setAuthor(event.target.value)}
  const handleUrlChange = (event) => {setUrl(event.target.value)}

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title: title, author: author, url: url }

    try {
      const returnedBlog = await blogservice.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewBlogs(newblog.concat(returnedBlog))
      handleBlogMessage(`blog with title ${blogObject.title} by author ${blogObject.author} 
            added`, 'success')
      blogFormRef.current.toggleVisibility()

      const loggedUser = window.localStorage.getItem('loggedBlogappUser')
      const user = JSON.parse(loggedUser)
      returnedBlog.user = user

    } catch (exception) {
      console.error(exception)
    }
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor='title'>title:</label>
          <input 
            id='title'
            type='text'
            value={title}
            name='Title' 
            onChange={handleTitleChange}/>
        </div>

                
        <div>
          <label htmlFor='author'>author:</label>
          <input 
            id='author'
            type='text'
            value={author} 
            name='Author'
            onChange={handleAuthorChange}/>
        </div>
    
        <div>
          <label htmlFor='url'>url:</label>
          <input 
            id='url'
            type='text'
            value={url} 
            name='Url'
            onChange={handleUrlChange}/>
        </div>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  )
}

export default AddNewBlog