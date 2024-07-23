// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las empresas
app.get('/empresas', (req, res) => {
  db.query('SELECT * FROM empresas ORDER BY nombre ASC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ruta para agregar una empresa
app.post('/empresas', (req, res) => {
  const { nombre, fechaConstitucion, tipoEmpresa, comentarios, favorita } = req.body;
  const query = 'INSERT INTO empresas (nombre, fechaConstitucion, tipoEmpresa, comentarios, favorita) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, fechaConstitucion, tipoEmpresa, comentarios, favorita], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Empresa agregada' });
  });
});

// Ruta para actualizar una empresa
app.put('/empresas/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, fechaConstitucion, tipoEmpresa, comentarios, favorita } = req.body;
  const query = 'UPDATE empresas SET nombre = ?, fechaConstitucion = ?, tipoEmpresa = ?, comentarios = ?, favorita = ? WHERE id = ?';
  db.query(query, [nombre, fechaConstitucion, tipoEmpresa, comentarios, favorita, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Empresa actualizada' });
  });
});

// Ruta para eliminar una empresa
app.delete('/empresas/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM empresas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Empresa eliminada' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});