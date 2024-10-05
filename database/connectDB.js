const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connect = mysql.createConnection({
    host: process.env.hostName || '127.0.0.1',
    database: process.env.databaseName,
    user: process.env.user,
    password: process.env.password
})

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

connect.connect((err) => {
    if (err) {
        console.log('err-> ', err.message)
    }

    console.log('Connected Success!')
})

app.listen(port, () => console.log('Node.js Port => ', port))

module.exports = {
    app,
    connect
}