require('dotenv').config({ path: '../.env' })
// require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT // MySQL
})

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');

    // Define la consulta SQL para crear la tabla 'prueba'
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS prueba (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255),
            apellido VARCHAR(255)
        )
    `;

    // Ejecuta la consulta SQL para crear la tabla 'prueba'
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
            return;
        }
        console.log('Tabla "prueba" creada correctamente');
    });
});

module.exports = connection;