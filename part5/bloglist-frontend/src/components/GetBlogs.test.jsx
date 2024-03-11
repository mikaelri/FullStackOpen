import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './GetBlogs'
import { expect } from 'vitest'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'www.testurl.com',
  likes: 10,
  user: {
    username: 'testuser',
    name: 'Test User'
  }
}

const mockSetNewBlogs = {}
const mockHandleBlogMessage = {}
const user = {
  name: 'Test User'
}

test('renders title and author correctly, but not url and likes by default', () => {  
  const { container } = render(<Blog blogs={[blog]} setNewBlogs={mockSetNewBlogs} handleBlogMessage={mockHandleBlogMessage} user={user} />)

  const div = container.querySelector('.blog-overview')
  expect(div).toHaveTextContent('Test Title Test Author')
  
  expect(screen.queryByText('www.testurl.com')).toBeNull()
  expect(screen.queryByText('likes: 10')).toBeNull()

  screen.debug(div)
})