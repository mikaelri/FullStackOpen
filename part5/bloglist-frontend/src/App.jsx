import { useState, useEffect } from 'react'
import Blog from './components/GetBlogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOut'
import AddNewBlog from './components/AddBlogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (<LoginForm setUser={ setUser }/>)
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <LogOutButton setUser={setUser}/>
        </p>
      <Blog blogs={ blogs } />
      <AddNewBlog blogs={ blogs } setBlogs={ setBlogs }/>
      </div>
    )
  }
}

export default App