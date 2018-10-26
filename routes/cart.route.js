const express = require('express');
const controller = require('../controllers/cart.controller');
const router = express.Router();

router.get('/add/:productID', controller.addToCart );

module.exports = router;