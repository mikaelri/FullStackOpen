const router = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')

router.post('/reset', async (request, response) => {

  console.log('Resetting notes and users...')

  await Note.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router