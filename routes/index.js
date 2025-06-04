var express = require('express');
var router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { renderHome } = require('../controllers/homeController');

router.get('/home', requireAuth, renderHome);

router.post('/admisiones/registro', function(req, res, next) {
  const { nombre, edad, motivo, documento, sexo, habitacion } = req.body;

  console.log('Datos del paciente:', { nombre, edad, motivo, documento, sexo, habitacion });

  res.redirect('/admisiones');
});

module.exports = router;
