const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsImageFolder = path.join(__dirname, '/../public/images/products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// const visited = products.filter(function(product) {
//     return product.category == 'visited'
// })
// const inSale = products.filter(function(product) {
//     return product.category == 'in-sale'
// })

const controller = {
    // Root - Show all products  	
    index: (req, res) => {
        res.render('products', {
            products,
            toThousand
        });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
		//console.log(req.params.id);
        let id = req.params.id;
        let product = products.find(product => product.id == id)
        res.render('productDetail', {
            product,
            toThousand
        });
    },

    // Create - Form to create
    create: (req, res) => {
		//console.log("create");
        res.render('productsForm');
    },

    // Create -  Method to store
    store: (req, res) => {
        let image
        console.log(req.files);
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        }
        let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image
        };
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/');
    },

    // Update - Form to edit
    edit: (req, res) => {
		console.log("edit de detail")
        let id = req.params.id
        let productToEdit = products.find(product => product.id == id)
        res.render('productsCons', { productToEdit })
    },

    // Update - Method to update
    update: (req, res) => {
		console.log(req.params.id);
        let id = req.params.id;
        let productToEdit = products.find(product => product.id == id)
        let image

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = productToEdit.image
        }

        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            image: image,
        };

        let newProducts = products.map(product => {
            if (product.id == productToEdit.id) {
                return product = {...productToEdit };
            }
            return product;
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        res.redirect('/');
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        let id = req.params.id;
        let finalProducts = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/');
    }
};

module.exports = controller;