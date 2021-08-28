const express = require('express');

//Requerir path
const path = require('path');

//usar recursos estaticos

const app = express();
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));
app.set("view engine","ejs");

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
});

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/home.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product-detail.html'));
});

app.get('/formulario', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/formulario.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});

app.get('/productsForm', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productsForm.html'));
});
