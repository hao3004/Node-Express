const db = require('../db');
const shortid = require('shortid');

/*
    Middleware là funct nhận vào 3 tham số (req, res, next)
*/
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
    // console.log(searchResults);
    res.render('users/index', {
        users: searchResults,
        keyw: keyw
    })
    },
    getCreate: (req, res) => {
        // console.log(req.cookies);
        res.render('users/create');
        // link trong folder
    },
    create: (req, res) => {
        req.body.id = shortid.generate();
        // console.log(res.locals);
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