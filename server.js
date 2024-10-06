const express = require('express')
const cors = require('cors')
const userRoute = require('./route/user-route')
const recordRoute = require('./route/record-route')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// router
app.use('/user', userRoute)
app.use('/record', recordRoute)

app.listen(port, () => console.log('Node.js Port => ', port))
