const express = require ('express');

//Requerir path
const path = require('path');

//usar recursos estaticos

const app = express();
const publicPath = path.resolve(__dirname,'./public');

app.use(express.static(publicPath));

app.listen(3000,()=>{
    console.log("si corrio 3000")
    });

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

app.get('/register', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/login', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});
