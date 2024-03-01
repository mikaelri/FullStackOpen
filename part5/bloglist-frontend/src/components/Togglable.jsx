import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef ((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
        toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <p><button onClick={toggleVisibility}>{props.buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <p><button onClick={toggleVisibility}>cancel</button></p>
      </div>
    </div>
  )
})

export default Togglable