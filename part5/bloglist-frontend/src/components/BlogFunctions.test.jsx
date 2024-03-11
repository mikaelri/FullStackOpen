import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './BlogFunctions'
import blogservice from '../services/blogs'
import userEvent from '@testing-library/user-event'


describe('Viewing blogs in user page', () => {

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
  
  const mockSetNewBlogs = vi.fn()
  const mockHandleBlogMessage = vi.fn()
  const user = { name: 'Test User' }

  let container

  beforeEach(() => {
    const result = render(<Blog blogs={[blog]} setNewBlogs={mockSetNewBlogs} handleBlogMessage={mockHandleBlogMessage} user={user} />)
    container = result.container
  })

  test('renders title and author, but not url and likes by default', () => {  

    const divHide = container.querySelector('.blog-overview')
    expect(divHide).toHaveTextContent('Test Title Test Author')
  
    expect(screen.queryByText('www.testurl.com')).toBeNull()
    expect(screen.queryByText('likes: 10')).toBeNull()
  })

  test('renders url and likes when view button is clicked', async () => {

    // clicking 'view' should show also url, likes and user
    const userSession = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userSession.click(viewButton)

    const divView = container.querySelector('.blog-showall')

    expect(divView).toHaveTextContent('www.testurl.com')
    expect(divView).toHaveTextContent(10)
    expect(divView).toHaveTextContent('Test User')

    // clicking 'hide' should hide url, likes and user
    const hideButton = screen.getByText('hide')
    await userSession.click(hideButton)

    const divHide = container.querySelector('.blog-overview')

    expect(divHide).toHaveTextContent('Test Title Test Author')
  
    expect(screen.queryByText('www.testurl.com')).toBeNull()
    expect(screen.queryByText('likes: 10')).toBeNull()
  })

  test('Clicking like button twice calls the function twice', async () => {

    // we mock directly the blogservice function to check that the button works
    // other option would be to render the html element and use something like UpdateLikes as props
    blogservice.update = vi.fn().mockResolvedValue({
      ...blog,
      likes: blog.likes +1
    })

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(blogservice.update.mock.calls).toHaveLength(2)
  })
})