const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // <- ESTO ES CLAVE

// Conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a la base de datos Biblioteca');
    }
});

// Ruta para obtener libros
app.get('/libros', (req, res) => {
    connection.query('SELECT * FROM libros', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Ruta para agregar libro
app.post('/libros', (req, res) => {
    const { titulo, autor, categoria, anio_publicacion, cantidad_disponible } = req.body;

    const sql = `
        INSERT INTO libros (titulo, autor, categoria, anio_publicacion, cantidad_disponible)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(sql, [titulo, autor, categoria, anio_publicacion, cantidad_disponible], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Libro agregado correctamente');
        }
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
