const listHelper  = require('../utils/list_helper')
const { listWithoutBlogs, listWithOneBlog, listWithManyBlogs } = require('./blogs_test_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithoutBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('of most likes returns correctly', () => {

  test('most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      }
    )
  })
})