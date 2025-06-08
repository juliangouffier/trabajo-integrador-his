var express = require('express');
var router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { renderHome } = require('../controllers/homeController');

router.get('/home', requireAuth, renderHome);

module.exports = router;
