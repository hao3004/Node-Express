const express = require('express');
const router = express.Router();

const db = require('../db');
var controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

router.get('/', controller.index );

router.get('/search', controller.search );
//link trong url
router.get('/create', (req, res) => {
    res.render('users/create');
    // link trong folder
})

router.post('/create', validate.create, controller.create);

// keyword: express js routing 
router.get('/:id', controller.details);

//router.get('/test', );

module.exports = router;