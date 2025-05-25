const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { Op } = require('sequelize');

router.get('/pacientes/predict', async (req, res) => {
  try {
    const search = req.query.search || '';

    const pacientes = await Paciente.findAll({
      where: {
        dni: {
          [Op.like]: `%${search}%`
        }
      },
      limit: 10
    });

    res.json(pacientes);
  } catch (err) {
    console.error('Error en búsqueda:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
