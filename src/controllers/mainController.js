const controller = {
    index: (req, res) => {
        res.render('index');
    },
    form: (req, res) => {
        res.render('formulario');
    },
    login: (req, res) => {
        res.render('login');
    },
    cart: (req, res) => {
        res.render('productCart');
    },
    detail: (req, res) => {
        res.render('productDetail');
    },
    products: (req, res) => {
        res.render('productsForm');
    }
}

module.exports = controller;