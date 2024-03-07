import { useState, useEffect, useRef } from 'react'
import Blog from './components/GetBlogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOut'
import AddNewBlog from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const returnBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    returnBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
    }, 7000)
  }

  if (user === null) {
    return (
    <div>
      <Notification message={notification} type={notificationType} />
      <LoginForm LoginUser={setUser} handleLoginMessage={handleMessage}/>
    </div>
    )
  } else {
    return (
      <div>
        <Notification message={notification} type={notificationType} />
        <h2>blogs</h2>
        <p>{user.name} logged in <LogOutButton setUser={setUser}/></p>

        <div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <AddNewBlog blogFormRef={blogFormRef} newblog={blogs} setNewBlogs={setBlogs} handleBlogMessage={handleMessage}/>
          </Togglable>
          <Blog blogs={blogs} setNewBlogs={setBlogs} handleBlogMessage={handleMessage} user={user}/>
        </div>
      </div>
    )
  }
}

export default App