import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    if (user === null) {
      return (
        <LoginForm setUser={ setUser } />
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
        <Blog blogs={ blogs } />
        </div>
      )
    }
  }

export default App