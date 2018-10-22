const express = require('express');
const router = express.Router();

const db = require('../db');
var controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

router.get('/', controller.index );

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 263);
    res.send('Hello cookie');
});
 
router.get('/search', controller.search );
//link trong url
router.get('/create', controller.getCreate);

router.post('/create', validate.create, controller.create);

// keyword: express js routing 
router.get('/:id', controller.details);

module.exports = router;