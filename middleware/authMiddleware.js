const { verifyToken } = require('../utils/jwt');

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect('/');

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/');
  }
}

module.exports = requireAuth;
