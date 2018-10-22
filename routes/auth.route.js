const express = require('express');
const router = express.Router();

const db = require('../db');
var controller = require('../controllers/auth.controller');

router.get('/login', controller.getLogin );

router.post('/login', controller.login );

module.exports = router;