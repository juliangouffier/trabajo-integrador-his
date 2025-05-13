const jwt = require('jsonwebtoken');

const JWT_SECRET = 'clave_secreta'; // setear dps

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new Error('Token inválido o expirado');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
