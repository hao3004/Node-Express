// require it
const express = require('express');
// this funct return a new app, as same: app = new app
const app = express();
// start a web server have a individual port
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing application/x-www-form-urlencoded

const pug = require('pug');
app.set('view engine', 'pug');
// views = folder contains files
app.set('views', './views');

var users = [
    { name: 'Hao', id: 1},
    { name: 'An', id: 2},
    { name: 'Tung', id: 3}
];
// lưu trong memory, nghĩa là khi load lại server còn mình từng này ;v

app.get('/', (req, res) => res.render('index', {
    name: 'Lang Hoai An' // gửi data qua đây, bên kia sử dụng = cách: #{name}
}
));

app.get('/users', (req, res) => 
    res.render('users/index', {
        users: users
    })
);

app.get('/users/search', (req, res) => {
    //res.render();
    keyw = req.query.keyw;
    var searchResults = users.filter((user) => {
        return user.name.toLowerCase().indexOf(keyw.toLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: searchResults
    })
})
//link trong url
app.get('/users/create', (req, res) => {
    res.render('users/create');
    // link trong folder
})

app.post('/users/create', (req, res) => {
    users.push(req.body);
    // res.render('users/index', {
    //     users: users
    // });
    // hoặc
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));