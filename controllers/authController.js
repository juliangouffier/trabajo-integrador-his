const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../utils/jwt');

async function login(req, res) {
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
}

function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/');
}

function renderLogin(req, res) {
  res.render('login', { title: 'Iniciar Sesión' });
}

module.exports = {
  login,
  logout,
  renderLogin
};
