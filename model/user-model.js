const connect = require('../database/connectDB')

async function create (username, password, name) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user (username, password, name) VALUES (?, ?, ?)'

    return connect.query(sql, [username, password, name], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.insertId)
      }
    })
  })
}

async function getUser (username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT user_id FROM user WHERE username = ? AND password = ?'

    connect.query(sql, [username, password], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
    })
  }) 
}

async function getUserId (username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT user_id FROM user WHERE username = ?'

    return connect.query(sql, [username], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports = {
  create,
  getUser,
  getUserId
}
