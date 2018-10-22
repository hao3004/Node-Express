const db = require('../db');

/*
    Middleware là funct nhận vào 3 tham số (req, res, next)
*/
module.exports = {
    getLogin: (req, res, next) => {
        res.render('auth/login');
    },
    login: (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;

        var user = db.get('users').find({ email: email }).value();

        if (!user) {
            res.render('auth/login', {
                errors: ['User is invalid.'],
                values: req.body
            });
            return;
        }
        // tới đoạn này là biết 
        // tồn tại email vừa nhập rồi, h đi so password
        if (password !== user.password) {
            res.render('auth/login', {
                errors: ['Password is wrong.'],
                values: req.body
            });
            return;
        }
        res.cookie('userID', user.id);
        res.redirect('/users')
    }
}