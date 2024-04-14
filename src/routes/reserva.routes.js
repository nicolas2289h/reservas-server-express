const { Router } = require("express");
const db = require('../db')
const jwt = require('jsonwebtoken')

const router = Router()

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' })
    }

    jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ message: 'Token inválido o expirado.' })
        }

        req.user = decoded
        next()
    })
}

// LISTAR TODAS LAS RESERVAS DE ACUERDO A LA FECHA SELECCIONADA
router.get('/reserva/listar', verifyToken, (req, res) => {
    const { fecha } = req.query // ?fecha=${fecha}
    const query = `SELECT * FROM reserva WHERE fecha=? `
    db.query(query, fecha, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las reservas: ' + err })
        }

        return res.status(200).json({ result });
    })
})

router.post('/reserva/guardar', verifyToken, (req, res) => {
    const { cliente, fecha, horario, nroMesa } = req.body
    console.log(req.body)
    const query = `INSERT INTO reserva (cliente, fecha, horario, nroMesa) VALUES (?,?,?,?)`
    db.query(query, [cliente, fecha, horario, nroMesa], (err, result) => {
        if (err) {
            console.error('Error al guardar la reserva:', err);
            return res.status(500).json({ message: 'Error al guardar la reserva: ' + err })
        }

        console.log('Reserva guardada:', result);
        return res.status(201).json({ message: 'Reserva guardada.' })
    })
})

// TRAER TODAS LAS RESERVAS DEL USUARIO LOGUEADO
router.get('/reserva/cliente', (req, res) => {
    const { username } = req.query
    const query = `SELECT * FROM reserva WHERE cliente=?`
    db.query(query, username, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor ' + err })
        }
        return res.status(200).json(result)
    })
})

router.delete('/reserva/eliminar/:id', (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM reserva WHERE id=?`
    db.query(query, id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor ' + err })
        }
        return res.status(200).json({ message: 'Reserva eliminada.' })
    })
})

module.exports = router;
