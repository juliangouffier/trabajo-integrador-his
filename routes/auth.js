const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../utils/jwt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Usuario o contraseña inválidos' });
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/home');
  } catch (err) {
    console.error('Error en login:', err);
    res.render('login', { error: 'Error interno del servidor' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});


module.exports = router;
