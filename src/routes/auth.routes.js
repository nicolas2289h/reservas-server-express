const { Router } = require('express')
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body
    const query = `SELECT * FROM users WHERE username = ?`

    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Nombre de usuario incorrecto.' })
        }

        const user = result[0];
        console.log(user.username)

        // Comparo los passwords
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Contraseña incorrecta.' })
            }

            // Genero el token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token, username });
        })
    })
})

router.post('/register', (req, res) => {
    const { nombre, apellido, email, username, password } = req.body

    bcrypt.hash(password, 10, (err, hashedPassword) => { // MODIFICAR LA LONGITUD DE PASSWORD EN LA BD (255) SINO ARROJA ERROR DE LONG DATA
        if (err) {
            return res.status(500).json({ message: 'Error al cifrar la contraseña.' })
        }

        const query = `INSERT INTO users (nombre, apellido, email, username, password) VALUES (?,?,?,?,?)`;
        db.query(query, [nombre, apellido, email, username, hashedPassword], (err, result) => {
            if (err) {
                console.error(err); // Error en la consola del servidor para corregir errores
                return res.status(500).json({ message: err })
            }

            return res.status(201).json({ message: 'Usuario registrado exitosamente.' })
        })
    })
})

module.exports = router;