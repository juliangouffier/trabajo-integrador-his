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

router.get('/pacientes/buscar', async (req, res) => {
  const q = req.query.q || '';
  const pacientes = await Paciente.findAll({
    where: {
      [Op.or]: [
        { dni: { [Op.like]: `%${q}%` } }
      ]
    },
    limit: 5
  });
  res.json(pacientes);
});

module.exports = router;
