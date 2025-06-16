const express = require('express');
const router = express.Router();
const { crearCama } = require('../controllers/camaController');
const requireAuth = require('../middleware/authMiddleware');

router.post('/', requireAuth, crearCama);

module.exports = router;
