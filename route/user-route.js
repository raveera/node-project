const express = require('express')
const { isEmpty } = require('lodash')
const userModel = require('../model/user-model')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body
  const response = {
    success: false,
    data: [],
    message: ''
  }

  const userId = await userModel.getUserId(username)

  if (!isEmpty(userId)) {
    response.message = 'Username alreay exists'

    return res.json(response)
  }

  const insertUserId = await userModel.create(username, password, name)

  response.success = true
  response.data = insertUserId

  return res.json(response)
})

router.post('/login', async function (req, res) {
  const { username, password } = req.body
  const response = {
    success: false,
    data: [],
    message: ''
  }

  const user = await userModel.getUser(username, password)

  if (isEmpty(user)) {
    response.message = 'username or password is invalid'

    return res.json(response)
  }

  response.success = true
  response.data = user[0]

  return res.json(response)
})

module.exports = router
