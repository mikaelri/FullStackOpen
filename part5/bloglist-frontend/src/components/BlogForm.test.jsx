import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddNewBlog from './BlogForm'
import blogservice from '../services/blogs'

describe('Blog form', () => {
  const mockNewBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockSetNewBlogs = vi.fn()
  const mockHandleBlogMessage = vi.fn()
  const mockBlogFormRef = { current: { toggleVisibility: vi.fn() } }

  // same as in BlogFunctions.test.jsx we mock directly the create function
  blogservice.create = vi.fn().mockResolvedValue({
    title: 'Another Test Title',
    author: 'Another Test Author',
    url: 'www.anothertesturl.com',
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  })

  test('updates parent state and calls onSubmit', async () => {
    render(<AddNewBlog 
      newblog={[mockNewBlog]} 
      setNewBlogs={mockSetNewBlogs} 
      handleBlogMessage={mockHandleBlogMessage} 
      blogFormRef={mockBlogFormRef} />)

    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputUrl = screen.getByLabelText('url:')

    await userEvent.type(inputTitle, 'Another Test Title')
    await userEvent.type(inputAuthor, 'Another Test Author')
    await userEvent.type(inputUrl, 'www.anothertesturl.com')

    // we test the inputs first as when we click 'create' it sets the fields as ''
    expect(inputTitle).toHaveValue('Another Test Title')
    expect(inputAuthor).toHaveValue('Another Test Author')
    expect(inputUrl).toHaveValue('www.anothertesturl.com')

    const createButton = screen.getByText('create')
    await userEvent.click(createButton)

    // we test that the creating a new blog function was called once
    await waitFor(() => expect(mockSetNewBlogs.mock.calls).toHaveLength(1))    
  })
})
