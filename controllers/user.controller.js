const db = require('../db');
const shortid = require('shortid');

module.exports = {

    index: (req, res) => 
    res.render('users/index', {
        users: db.get('users').value()
    }),

    search: (req, res) => {
    //res.render();
    keyw = req.query.keyw;
    var searchResults = db.get('users').filter((user) => {
        return user.name.toLowerCase().indexOf(keyw.toLowerCase()) !== -1;
    }).write();
    res.render('users/index', {
        users: searchResults
    })
    },

    create: (req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        // res.render('users/index', {
        //     users: users
        // });
        // hoặc
        res.redirect('/users');
    },

    details: (req, res) => {
        var id = req.params.id;
        var user = db.get('users').find({ id: id}).value();
        res.render('users/details', {
            user: user
        });
    }    
}