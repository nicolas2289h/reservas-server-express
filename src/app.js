require('dotenv').config({ path: '../.env' })
// require('dotenv').config() // si todos los archivos estan al mismo nivel

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth.routes.js');
const reservaRouter = require('./routes/reserva.routes.js')
const db = require('./db.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

// Rutas
app.use(authRouter)
app.use(reservaRouter)

// BORRAR PRUEBA1
app.get('/home', (req, res) => {
    res.json('home')
})

// BORRAR PRUEBA2
app.post('/guardar', (req, res) => {
    const { nombre, apellido } = req.body
    console.log(req.body)
    const query = `INSERT INTO prueba (nombre, apellido) VALUES (?,?)`
    db.query(query, [nombre, apellido], (err, result) => {
        if (err) {
            console.error('Error en test:', err);
            return res.status(500).json({ message: 'Error al guardar test: ' + err })
        }

        return res.status(201).json({ message: 'test guardada.' })
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})
