const mysql = require('mysql2')

const connect = mysql.createConnection({
    host: process.env.hostName || '127.0.0.1',
    database: process.env.databaseName,
    user: process.env.user,
    password: process.env.password
})

connect.connect((err) => {
    if (err) {
        console.log('err-> ', err.message)
    }

    console.log('Connected Success!')
})

module.exports = connect
