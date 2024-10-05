const express = require('express')
const cors = require('cors')
const user = require('./route/user')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// router
app.use('/user', user)

app.listen(port, () => console.log('Node.js Port => ', port))
