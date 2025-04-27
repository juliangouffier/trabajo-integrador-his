var express = require('express');
var router = express.Router();

const habitaciones = [
  { id: 1, numero: '101', estado: 'Disponible', camas: 2, tipo: 'Individual' },
  { id: 2, numero: '102', estado: 'Ocupada', camas: 2, tipo: 'Doble' },
  { id: 3, numero: '103', estado: 'Mantenimiento', camas: 1, tipo: 'Individual' }
];

const items = [
  { title: 'Admisiones', desc: 'Registrar ingreso de pacientes.', link: '/admisiones' },
  { title: 'Habitaciones', desc: 'Gestionar habitaciones y camas.', link: '/habitaciones' },
  { title: 'Evaluación de Enfermería', desc: 'Registrar evaluaciones iniciales.', link: '/evaluacion-enfermeria' }
];

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Sistema de Información Hospitalaria', items });
});

router.get('/admisiones', function(req, res, next) {
  res.render('admisiones', { title: 'Admisión de Paciente' });
});

router.post('/admisiones/registro', function(req, res, next) {
  const { nombre, edad, motivo, documento, sexo, habitacion } = req.body;

  console.log('Datos del paciente:', { nombre, edad, motivo, documento, sexo, habitacion });

  res.redirect('/admisiones');
});

router.get('/habitaciones', function(req, res, next) {
  res.render('habitaciones', { title: 'Gestión de Habitaciones', habitaciones });
});

router.post('/habitaciones/crear', function(req, res, next) {
  const { numero, estado, camas, tipo } = req.body;

  console.log('Habitación creada:', { numero, estado, camas, tipo });

  res.redirect('/habitaciones');
});

module.exports = router;
