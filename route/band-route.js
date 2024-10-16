const express = require('express')
const { isEmpty } = require('lodash')
const bandModel = require('../model/band-model')
const recordModel = require('../model/record-model')

const router = express.Router()

const defaultResponse = {
  success: false,
  data: [],
  message: ''
}

router.get('/:recordId', async (req, res) => { 
  const recordId = req.params.recordId
  const response = Object.assign({}, defaultResponse)

  try {
    const recordName = await recordModel.getRecordNameByRecordId(recordId)
    const bandList = await bandModel.getBandListByRecordId(recordId)
    response.success = true
    response.data = {
      recordName: recordName || '',
      bandList: bandList || []
    }

    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.post('/create', async (req, res) => {
  const { recordId, bandName } = req.body
  const response = Object.assign({}, defaultResponse)

  try {
    const tempBandName = await bandModel.getBandName(recordId, bandName)

    if (!isEmpty(tempBandName)) {
      response.success = false
      response.message = 'Band name already exists'
    } else {
      const bandId = await bandModel.createBand(recordId, bandName)

      response.success = true
      response.data = bandId
    }

    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.put('/edit', async (req, res) => {
  const { recordId, bandId, bandName } = req.body
  const response = Object.assign({}, defaultResponse)

  try {
    const tempBandName = await bandModel.getBandName(recordId, bandName)
    
    if (!isEmpty(tempBandName)) {
      response.success = false
      response.message = 'Band name already exists'
    } else {
      const affectedRows = await bandModel.updateBand(bandId, bandName)

      response.success = true
      response.data = { affectedRows } 
    }
    
    return res.json(response)
  } catch (error) {
    throw error
  }
})

router.delete('/bandId', async (req, res) => {
  const bandId = req.params.id
  const response = Object.assign({}, defaultResponse)

  try {
    const affectedRows = await bandModel.remove(bandId)

    response.success = true
    response.data = { affectedRows }
  
    return res.json(response)
  } catch (error) {
    throw error
  }
})

module.exports = router