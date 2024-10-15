const { reject, result } = require('lodash')
const connect = require('../database/connectDB')

async function getBandListByRecordId (recordId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT band_id, band_name FROM band WHERE record_id = ?'

    return connect.query(sql, [recordId], (err, rowList) => {
      if (err) {
        reject(err)
      } else {
        resolve(rowList)
      }
    })
  })
}

async function getBandName (recordId, bandName) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT band_name FROM band WHERE record_id = ? AND band_name = ?'

    return connect.query(sql, [recordId, bandName], (err, rowList) => {
      if (err) {
        reject(err)
      } else {
        resolve(rowList)
      }
    })
  })
}

async function createBand (recordId, bandName) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO band (record_id, band_name) VALUES (?, ?)'

    return connect.query(sql, [recordId, bandName], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.insertId)
      }
    }) 
  })
}

async function updateBand (bandId, bandName) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE band SET band_name = ? WHERE band_id = ?'

    return connect.query(sql, [bandName, bandId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.affectedRows)
      }
    })
  })
}

async function removeBand (bandId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM band WHERE band_id = ?'

    return connect.query(sql, [bandId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.affectedRows)
      }
    })
  })
}

async function removeBandByRecordId (recordId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM band WHERE record_id = ?'

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
  getBandListByRecordId,
  createBand,
  getBandName,
  updateBand,
  removeBand,
  removeBandByRecordId
}