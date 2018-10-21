const express = require('express');
const router = express.Router();

const db = require('../db');
var controller = require('../controllers/user.controller');

router.get('/', controller.index );

router.get('/search', controller.search );
//link trong url
router.get('/create', (req, res) => {
    res.render('users/create');
    // link trong folder
})

router.post('/create', controller.create);

// keyword: express js routing 
router.get('/:id', controller.details);

module.exports = router;