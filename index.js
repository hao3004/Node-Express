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

const shortid = require('shortid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write();

// lưu trong memory, nghĩa là khi load lại server còn mình từng này ;v

app.get('/', (req, res) => res.render('index', {
    name: 'Lang Hoai An' // gửi data qua đây, bên kia sử dụng = cách: #{name}
}
));

app.get('/users', (req, res) => 
    res.render('users/index', {
        users: db.get('users').value()
    })
);

app.get('/users/search', (req, res) => {
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
app.get('/users/create', (req, res) => {
    res.render('users/create');
    // link trong folder
})

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    // res.render('users/index', {
    //     users: users
    // });
    // hoặc
    res.redirect('/users');
});

// keyword: express js routing 
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();
    res.render('users/details', {
        user: user
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));