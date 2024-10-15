const express = require('express')
const { isEmpty } = require('lodash')
const recordModel = require('../model/record-model')
const bandModel = require('../model/band-model')

const router = express.Router()

router.get('/', async (req, res) => {
  const response = {
    success: false,
    data: [],
    message: ''
  }

  try {
    const recordList = await recordModel.getRecordList()
    response.success = true
    response.data = recordList

    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.post('/create', async (req, res) => {
  const { userId, name } = req.body
  const response = {
    success: false,
    data: [],
    message: ''
  }

  try {
    const recordName = await recordModel.getRecordName(name)

    if (!isEmpty(recordName)) {
      response.success = false
      response.message = 'Record name already exists'
    
      return res.json(response)
    }

    const insertId = await recordModel.create(userId, name)

    response.success = true
    response.data = insertId
  
    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.put('/edit', async (req, res) => {
  const { recordId, name } = req.body
  const response = {
    success: false,
    data: [],
    message: ''
  }

  try {
    const recordName = await recordModel.getRecordName(name)

    if (!isEmpty(recordName)) {
      response.success = false
      response.message = 'Record name already exists'
    
      return res.json(response)
    }

    const affectedRows = await recordModel.update(recordId, name)

    response.success = true
    response.data = { affectedRows }
  
    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.delete('/:id', async (req, res) => {
  const recordId = req.params.id
  const response = {
    success: false,
    data: [],
    message: ''
  }

  try {
    const bandAffectedRow = await bandModel.removeBandByRecordId(recordId)
    const recordAffectedRows = await recordModel.remove(recordId)

    response.success = true
    response.data = { bandAffectedRow, recordAffectedRows }
  
    return res.json(response)
  } catch (error) {
    throw error
  }
})

module.exports = router