// require it
const express = require('express');
// this funct return a new app, as same: app = new app
const app = express();
// start a web server have a individual port
const port = 3000;

const pug = require('pug');
app.set('view engine', 'pug');
// views = folder contains files
app.set('views', './views');

app.get('/', (req, res) => res.render('index', {
    name: 'Lang Hoai An' // gửi data qua đây, bên kia sử dụng = cách: #{name}
}
));

app.get('/users', (req, res) => res.render('users/index', {
    users: [
        { name: 'Hao', id: 1},
        { name: 'An', id: 2} 
    ]
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));