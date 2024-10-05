const express = require('express')
const { isEmpty } = require('lodash')
const connect = require('../database/connectDB')

const router = express.Router()

// route
// router.get('/', (req, res) => {
//   const sql = 'SELECT * FROM user'
  
//   connect.query(sql, (err, result) => {
//     if (err) {
//       console.log(err.message)
//     }

//     res.json(result)
//   })
// })
const response = {
  success: false,
  data: [],
  message: ''
}

router.post('/register', (req, res) => {
  const { username, password, name } = req.body
  const sql = 'INSERT INTO user (username, password, name) VALUES (?, ?, ?)'

  connect.query(sql, [username, password, name], (err, result) => {
    if (err) {
      console.log(err.message)
    }

    response.success = true
    response.data = { userId: result.insertId}
    
    res.json(response)
  })
})

router.post('/login', function (req, res) {
  const { username, password } = req.body
  const sql = 'SELECT user_id, name  FROM user WHERE username = ? AND password = ?'

  connect.query(sql, [username, password], (err, list) => {
    if (err) {
      console.log(err.message)
    }

    if (isEmpty(list)) {
      response.message = 'username or password is invalid'

      return res.json(response)
    }

    response.success = true
    response.data = list[0]

    res.json(response)
  })
})

module.exports = router
