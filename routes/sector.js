const express = require('express');
const router = express.Router();
const { Sector, Habitacion } = require('../models');
const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth);

router.post('/', async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre?.trim()) {
      return res.status(400).json({ error: 'Debe informar un nombre' });
    }
    const existe = await Sector.findOne({ where: { nombre } });
    if (existe) {
      return res.status(409).json({ error: 'Ya existe un sector con ese nombre' });
    }
    const nuevo = await Sector.create({ nombre });
    return res.status(201).json(nuevo);
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const sectores = await Sector.findAll({
      include: [{ model: Habitacion, attributes: ['id','numero'] }]
    });
    return res.json(sectores);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const sec = await Sector.findByPk(req.params.id);
    if (!sec) return res.status(404).json({ error: 'Sector no encontrado' });
    const { nombre } = req.body;
    if (nombre) sec.nombre = nombre;
    await sec.save();
    return res.json(sec);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const countHabs = await Habitacion.count({ where: { sector_id: req.params.id } });
    if (countHabs > 0) {
      return res.status(400).json({ error: 'No se puede eliminar: tiene habitaciones asociadas' });
    }
    const borró = await Sector.destroy({ where: { id: req.params.id } });
    if (!borró) return res.status(404).json({ error: 'Sector no encontrado' });
    return res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
