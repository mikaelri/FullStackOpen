import { useState, useEffect } from 'react'
import Blog from './components/GetBlogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOut'
import AddNewBlog from './components/AddBlogs'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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

  const handleNotificationMessage = (message, type) => {
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
      <LoginForm setUser={setUser} handleMessage={handleNotificationMessage}/>
    </div>
    )
  } else {
    return (
      <div>
        <Notification message={notification} type={notificationType} />
        <h2>blogs</h2>
        <p>{user.name} logged in <LogOutButton setUser={setUser}/></p>
      <Blog blogs={ blogs } />
      <AddNewBlog blogs={blogs} setBlogs={setBlogs} handleMessage={handleNotificationMessage}/>
      </div>
    )
  }
}

export default App