var express = require('express');
var router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const habitaciones = [
  { id: 1, numero: '101', estado: 'Disponible', camas: 2, tipo: 'Individual' },
  { id: 2, numero: '102', estado: 'Ocupada', camas: 2, tipo: 'Doble' },
  { id: 3, numero: '103', estado: 'Mantenimiento', camas: 1, tipo: 'Individual' }
];

const quickAccess = [
  { title: 'Pacientes', link: '/pacientes', icon: 'bi bi-people' },
  { title: 'Citas', link: '/citas', icon: 'bi bi-calendar2-week' },
  { title: 'Reportes', link: '/reportes', icon: 'bi bi-bar-chart' }
];

const items = [
  { title: 'Nueva Admision', desc: 'Registrar ingreso de pacientes.', link: '/admisiones', icon: 'bi bi-hospital' },
  { title: 'Historia Clinica', desc: 'Gestionar internaciones.', link: '#', icon: 'bi bi-door-open' },
  { title: 'Evaluación de Enfermería', desc: 'Registrar evaluaciones iniciales.', link: '#', icon: 'bi bi-clipboard-heart' }
];

const camasPorHabitacion = [
  {
    habitacion: '101',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
  {
    habitacion: '102',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
  {
    habitacion: '103',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
  {
    habitacion: '104',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
  {
    habitacion: '105',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
  {
    habitacion: '106',
    sector: 'A',
    camas: [
      { numero: 'C1', estado: 'LIBRE', color: '#198754', genero: 'M' },
      { numero: 'C2', estado: 'OCUPADA', color: '#dc3545', genero: 'F' }
    ]
  },
]

router.get('/home', requireAuth, (req, res) => {
  res.render('home', {
    title: 'Sistema de Información Hospitalaria',
    items,
    quickAccess,
    camasPorHabitacion
  });
});

router.get('/admisiones', function(req, res, next) {
  res.render('admisiones', { title: 'Admisión de Paciente' });
});

router.get('/admisiones/listado', function(req, res, next) {
  res.render('listado-admisiones', { title: 'Admisión de Paciente' });
});


router.post('/admisiones/registro', function(req, res, next) {
  const { nombre, edad, motivo, documento, sexo, habitacion } = req.body;

  console.log('Datos del paciente:', { nombre, edad, motivo, documento, sexo, habitacion });

  res.redirect('/admisiones');
});

module.exports = router;
