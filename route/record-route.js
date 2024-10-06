const express = require('express')
const { isEmpty } = require('lodash')
const recordModel = require('../model/record-model')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const response = {
    success: false,
    data: [],
    message: ''
  }

  try {
    const recordList = await recordModel.getRecordListByUserId(userId)
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
    const affectedRows = await recordModel.remove(recordId)

    response.success = true
    response.data = { affectedRows }
  
    return res.json(response)
  } catch (error) {
    throw error
  }
})

module.exports = router