const express = require('express');
const router = express.Router();

const db = require('../db');
var controller = require('../controllers/product.controller');

router.get('/', controller.index );

module.exports = router;