const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsImageFolder = path.join(__dirname, '/../public/images/products');

//NUEVO BD
const db = require('../../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Products = db.Product;

//TRAER VALIDACIONES DE ALTA PRODS
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// const visited = products.filter(function(product) {
//     return product.category == 'visited'
// })
// const inSale = products.filter(function(product) {
//     return product.category == 'in-sale'
// })

const controller = {
    // Root - Show all products  	
    // index: (req, res) => {
    //     res.render('products/products', {
    //         products,
    //         toThousand
    //     });
    // },

    'index': (req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render('products/products.ejs', {products, toThousand})
            })
    },

// Detail - Detail from one product
//nuevo BD

    'detail': (req, res) => {
        console.log('ya entre a detail')
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('products/productsCons', {product, toThousand});
            });
    },

    //BD NUEVO EDIT

    'edit': function(req, res) {
        console.log('ya entre a EDIT')
        let prodId = req.params.id;
        db.Product.findByPk(prodId)
        .then(product => {
            return res.render('products/productEdit', {product});
        })
    },

    //BD NUEVO UPDATE
    update: function (req,res) {
        let prodId = req.params.id;
        console.log("entre a update");

        
       let image        
       if (req.files[0] != undefined) {
           image = req.files[0].filename
       } else {
           image = 'default-image.png'
       }
        db.Product.update(
            {
                product_name: req.body.product_name,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category,
                description: req.body.description,
                color: req.body.color,
                size: req.body.size,
                image: image
            },
            {
                where: {product_id: prodId}
            }
        )
        .then(()=> {
            return res.redirect('/products')})        
        .catch(error => res.send(error));
    },
 
    // DBDelete - Delete one product
    destroy: (req, res) => {
        console.log('entre a destroy')
        let prodId = req.params.id;
        db.Product.destroy({where: {product_id: prodId}, force: true})
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },


    // detail: (req, res) => {
    //     console.log(req.params.id);
    //     let id = req.params.id;
    //     let product = products.find(product => product.id == id)
    //     res.render('products/productsCons', {
    //         product,
    //         toThousand
    //     });
    // },

    // Update - Form to edit
        // 'edit': (req, res) => {
        //     console.log("edit de detail")
        //     let id = req.params.id
        //     let productToEdit = products.find(product => product.id == id)
        //     res.render('products/productEdit', { productToEdit })
        // },

    // Create - Form to create
    create: (req, res) => {
        console.log("create");
        res.render('products/productsForm');
    },

    //DB NUEVO STORE
    store: function (req, res) {
        const resultsValidation = validationResult(req);
        if(resultsValidation.errors.length > 0){
            return res.render('products/productsForm', {
                errors: resultsValidation.mapped(),
                oldData: req.body
            })
       } 

       let image        
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        }

        db.Product.create(
            {
                product_name: req.body.product_name,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category,
                description: req.body.description,
                color: req.body.color,
                size: req.body.size,
                image: image
            },
        )
        .then(()=> {
            return res.redirect('/products')})   
        .catch(error => res.send(error))
    },
    
    // Create -  Method to store
    // store: (req, res) => {
    //     let image
    //     console.log(req.files);
    //     if (req.files[0] != undefined) {
    //         image = req.files[0].filename
    //     } else {
    //         image = 'default-image.png'
    //     }
    //     let newProduct = {
    //         id: products[products.length - 1].id + 1,
    //         ...req.body,
    //         image: image
    //     };
    //     products.push(newProduct)
    //     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    //     res.redirect('/');
    // }

    // Update - Method to update
    // update: (req, res) => {
    //     console.log(req.params.id);
    //     let id = req.params.id;
    //     let productToEdit = products.find(product => product.id == id)
    //     let image

    //     if (req.files[0] != undefined) {
    //         image = req.files[0].filename
    //     } else {
    //         image = productToEdit.image
    //     }

    //     productToEdit = {
    //         id: productToEdit.id,
    //         ...req.body,
    //         image: image,
    //     };

    //     let newProducts = products.map(product => {
    //         if (product.id == productToEdit.id) {
    //             return product = {...productToEdit };
    //         }
    //         return product;
    //     })

    //     fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
    //     res.redirect('/');
    // },

    // destroy: (req, res) => {
    //     let id = req.params.id
    //     const productoAEliminar = products.findIndex(producto => id == producto.id)
    //     if (productoAEliminar >= 0) {
    //         products.splice(productoAEliminar, 1)
    //         fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8')
    //         res.redirect('/products')
    //     } else
    //         res.redirect('/products')
    // }
};

module.exports = controller;