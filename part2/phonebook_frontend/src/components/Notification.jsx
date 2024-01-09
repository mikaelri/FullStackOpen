const Notification = ({ text }) => {
  if (text === null) {
    return null
  }

  return (
    <div className={text.type}>
      {text.message}
    </div>
  )
}
  export default Notification;