const mysql = require('mysql')

const connect = mysql.createConnection({
    host: process.env.hostName || '127.0.0.1',
    database: process.env.databaseName,
    user: process.env.user,
    password: process.env.password
})

connect.connect((err) => {
    if (err) {
        throw err
    }

    console.log("Connected Success!")
})

module.exports = connect