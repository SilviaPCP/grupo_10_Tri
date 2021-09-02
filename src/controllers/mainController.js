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
    recuperarpass: (req, res) => {
        res.render('recuperarpass');
    },
    cart: (req, res) => {
        res.render('cartNew');
    },
    detail: (req, res) => {
        res.render('productDetail');
    },
    products: (req, res) => {
        res.render('productsForm');
    },
    prodsCons: (req, res) => {
        res.render('productsCons');
    }
}

module.exports = controller;
