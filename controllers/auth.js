const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};
