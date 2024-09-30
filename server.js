const express = require('express')
const { connect } = require('./database/connectDB')

const app = express()
const port = process.env.PORT || 3000

// route
app.get('/', (req, res) => {
    res.send('Hello Node.js')
})

app.listen(port, () => console.log('Node.js Port => ', port))
