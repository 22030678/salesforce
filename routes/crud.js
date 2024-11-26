const express = require('express');
const router = express.Router();

// Crear un registro
router.post('/create', async (req, res) => {
  const { object, data } = req.body;

  try {
    const result = await req.conn.sobject(object).create(data);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

// Leer registros
router.get('/read', async (req, res) => {
  const { object, fields, condition } = req.query;

  try {
    const records = await req.conn.sobject(object)
      .find(condition ? JSON.parse(condition) : {}, fields ? fields.split(',') : null);
    res.send({ success: true, records });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

// Actualizar un registro
router.put('/update', async (req, res) => {
  const { object, id, data } = req.body;

  try {
    const result = await req.conn.sobject(object).update({ Id: id, ...data });
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

// Eliminar un registro
router.delete('/delete', async (req, res) => {
  const { object, id } = req.body;

  try {
    const result = await req.conn.sobject(object).destroy(id);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

module.exports = router;