const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/formulario', mainController.form);
router.get('/login', mainController.login);
router.get('/cartNew', mainController.cart);
router.get('/recuperarpass', mainController.recuperarpass);
router.get('/productCart', mainController.cart);
router.get('/productDetail', mainController.detail);
router.get('/productsForm', mainController.products);
router.get('/productsCons', mainController.prodsCons);
router.get('/search', mainController.search);

module.exports = router;