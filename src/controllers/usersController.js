const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs'); 

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersImageFolder = path.join(__dirname, '/../public/images/users');

// traer las validacinoes de formulario
const { validationResult } = require('express-validator');
const { url } = require('inspector');
const { URLSearchParams } = require('url');

const controller = {
     index: (req,res) =>{
         res.render('formulario')
     },
    login: (req,res)=>{
        res.render('login');
    },
    profile: (req,res)=>{
        console.log('profiel');
        res.render('userProfile');
    },
    validate: (req, res)=>{
        // res.cookie('testing', 'Hola mundo', {maxAge: 1000 * 30});
        // console.log(req.cookies.testing); 
        const resultsValidationLogin = validationResult(req);
          if(resultsValidationLogin.errors.length > 0){
              return res.render('login', {
                  errors: resultsValidationLogin.mapped(),
                  oldData: req.body
              });
         }          
            //validando que le usuario exista
           let Uemail = req.body.email;
           let userFound = users.find(user => user.email === Uemail)
//aqui entra si todo esta bien
           if (userFound){
            let isOKUser = bcryptjs.compareSync(req.body.password, userFound.password);
            if (isOKUser){
                delete userFound.password;
                req.session.userLogged = userFound;
                //return res.render('userProfile', {user: req.session.userLogged});
                return res.redirect('/../index');
            }
            //password no coincide
            return res.render('login', {
                errors:{
                    email:{
                        msg: 'Password incorrecto'
                    }
                }
            });


           }
           return res.render('login', {
               errors:{
                   email:{
                       msg: 'Usuario no existente'
                   }
               }
           });
    },

    store: (req, res)=> {
         const resultsValidation = validationResult(req);
          if(resultsValidation.errors.length > 0){
              return res.render('formulario', {
                  errors: resultsValidation.mapped(),
                  oldData: req.body
              })
         } 
         // mientras else {
         let userInDB = users.find(user => user.email === req.body.email);

            if (userInDB){
                return res.render('formulario', {
                    errors:{
                        email: {
                            msg: 'Este email ya esta registrado'
                        }
                    },
                oldData: req.body
                });
            }
         
            
            let image
                
             if (req.files[0] != undefined) {
                  image = req.files[0].filename
                  console.log(image);
             } else {
                 image = 'default-image.png'
            }

            let passHash =bcryptjs.hashSync(req.body.password, 10);
            

            let newUser = {
                id: users[users.length - 1].id + 1,
                ...req.body,
                password: passHash,
                password2: '',
                image: image
            };
            
            users.push(newUser)

            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/login');    
        //mientras}
    },
    findByPk: (req, res) => {
        //console.log(req.params.id);
        let id = req.params.id;
        let userFound = users.find(users => user.id == id)
        console.log("buscando");
        //res.render('products/productsCons', {
            //product,
            //toThousand
        //});
    },
}

module.exports = controller;