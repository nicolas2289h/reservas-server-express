require('dotenv').config({ path: '../.env' })
// require('dotenv').config() // si todos los archivos estan al mismo nivel

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth.routes.js');
const reservaRouter = require('./routes/reserva.routes.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

// Rutas
app.use(authRouter)
app.use(reservaRouter)

app.get('/home', (req, res) => {
    res.json('home')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})
