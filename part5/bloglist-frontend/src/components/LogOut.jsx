const LogOutButton = ( { setUser }) => {

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
    setUser(null)
  }
  return (
    <button onClick={handleLogOut}>Logout</button>
  )
}

export default LogOutButton