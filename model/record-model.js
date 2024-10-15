const connect = require('../database/connectDB')

async function create (userId, name) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO record (user_id, name) VALUES (?, ?)'

    return connect.query(sql, [userId, name], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.insertId)
      }
    })
  })
}

async function getRecordName (name) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM record WHERE name = ?'

    return connect.query(sql, [name], (err, rowList) => {
      if (err) {
        reject(err)
      } else {
        resolve(rowList)
      }
    })
  })
}

async function getRecordByRecordId (recordId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM record WHERE record_id = ?'

    return connect.query(sql, [recordId], (err, rowList) => {
      if (err) {
        reject(err)
      } else {
        resolve(rowList)
      }
    })
  })
}

async function getRecordList () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT record_id, name FROM record'

    return connect.query(sql, (err, rowList) => {
      if (err) {
        reject(err)
      } else {
        resolve(rowList)
      }
    })
  })
}

async function update (recordId, name) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE record SET name = ? WHERE record_id = ?'

    return connect.query(sql, [name, recordId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.affectedRows)
      }
    })
  })
}

async function remove (recordId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM record WHERE record_id = ?'

    return connect.query(sql, [recordId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.affectedRows)
      }
    })
  })
}

module.exports = {
  create,
  getRecordName,
  getRecordList,
  getRecordByRecordId,
  update,
  remove
}
