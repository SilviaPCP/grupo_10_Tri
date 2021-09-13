// ************ Require's ************
const createError = require('http-errors');
//const cookieParser = require('cookie-parser');
const express = require('express');
//const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const app = express();

const mainRutas = require('./src/routes/mainRouter');
const productsRouter = require('./src/routes/products'); // Rutas /products

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/', mainRutas);
app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});