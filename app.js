const express = require('express');
const path = require('path');

const app = express();
const mainRutas = require('./routes/main');

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/', mainRutas);

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});