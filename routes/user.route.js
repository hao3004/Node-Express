const express = require('express');
const router = express.Router();

const db = require('../db');
const shortid = require('shortid');

router.get('/', (req, res) => 
    res.render('users/index', {
        users: db.get('users').value()
    })
);

router.get('/search', (req, res) => {
    //res.render();
    keyw = req.query.keyw;
    var searchResults = db.get('users').filter((user) => {
        return user.name.toLowerCase().indexOf(keyw.toLowerCase()) !== -1;
    }).write();
    res.render('users/index', {
        users: searchResults
    })
})
//link trong url
router.get('/create', (req, res) => {
    res.render('users/create');
    // link trong folder
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    // res.render('users/index', {
    //     users: users
    // });
    // hoặc
    res.redirect('/users');
});

// keyword: express js routing 
router.get('/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();
    res.render('users/details', {
        user: user
    });
});

module.exports = router;