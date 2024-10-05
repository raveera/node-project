const { isEmpty } = require('lodash')
const { app, connect } = require('./database/connectDB')

// route
app.get('/user', (req, res) => {
    const sql = 'SELECT * FROM user'
    
    connect.query(sql, (err, result) => {
        if (err) {
            console.log(err.message)
        }

        res.json(result)
    })
})

app.post('/user/create', (req, res) => {
    const sql = ''

    connect.query(sql, (err, result) => {
        if (err) {
            console.log(err.message)
        }

        res.json(result)
    })
})

app.post('/user/login', function (req, res) {
    const { username, password} = req.body
    const sql = 'SELECT user_id, name, password  FROM user WHERE username = ? AND password = ?'

    connect.query(sql, [username, password], (err, list) => {
        if (err) {
            console.log(err.message)
        }

        const response = {
            status: false,
            data: [],
            message: ''
        }

        if (isEmpty(list)) {
            response.message = 'username or password is invalid'

            return res.json(response)
        }

        response.status = true
        response.data = list
        res.json(response)
        
        // res.json(result)
    })
  })