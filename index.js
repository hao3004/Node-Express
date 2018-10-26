require('dotenv').config();
// require it
const express = require('express');
// this funct return a new app, as same: app = new app
const app = express();
// start a web server have a individual port
const port = 3000;

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json()); 
// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing application/x-www-form-urlencoded
app.use(cookieParser('haolt566fg6vf6356gg'));
const pug = require('pug');
app.set('view engine', 'pug');
// views = folder contains files
app.set('views', './views');

const db = require('./db');

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

app.get('/', (req, res) => res.render('index', {
    name: 'Lang Hoai An' // gửi data qua đây, bên kia sử dụng = cách: #{name}
}
));

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
// app.use('/products', authMiddleware.requireAuth, productRoutes); 
// đoạn này nó redirect lại ra /users ?? goai :<<
app.use('/products',  productRoutes);
app.use('/cart',  cartRoutes);
app.use(sessionMiddleware.hasCookie);// ghi như này nghĩa là nó sẽ có ảnh hưởng 
                            // tới các đường dẫn mà mình chỉ định
app.use(express.static('public'));

app.listen(port, () => console.log(`Hey you guys, haolt here :)) ${port}!`));