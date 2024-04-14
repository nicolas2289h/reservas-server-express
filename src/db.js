require('dotenv').config({ path: '../.env' })
// require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT // MySQL
})

connection.connect(err => {
    if (err) {
        return console.log('Error connecting database ', err.stack)
    }
    console.log('Database connected.')
})

module.exports = connection