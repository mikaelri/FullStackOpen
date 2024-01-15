const listHelper = require('../utils/list_helper')
const { listWithoutBlogs, listWithOneBlog, listWithManyBlogs } = require('./blogs_test_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.dummy(listWithoutBlogs)
    expect(result).toBe(1)
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