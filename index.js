// require it
const express = require('express');
// this funct return a new app, as same: app = new app
const app = express();
// start a web server have a individual port
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', (req, res) => res.send('User List'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));