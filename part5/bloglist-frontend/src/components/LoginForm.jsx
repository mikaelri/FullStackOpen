import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const LoginForm = ({ LoginUser, handleLoginMessage }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user))
      LoginUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleLoginMessage('wrong credentials, check your username and password', 'error')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>   
  )
}

LoginForm.propTypes = {
  LoginUser: PropTypes.func.isRequired,
  handleLoginMessage: PropTypes.func.isRequired
}

export default LoginForm