const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs'); 

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersImageFolder = path.join(__dirname, '/../public/images/users');

// traer las validacinoes de formulario
const { validationResult } = require('express-validator');
const { url } = require('inspector');
const { URLSearchParams } = require('url');

//DB
const db = require('../../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Products = db.User;


const controller = {
     index: (req,res) =>{
         res.render('formulario')
     },
    login: (req,res)=>{
        res.render('login');
    },
    profile: (req,res)=>{
        res.render('userProfile');
    },
    logout:(req, res)=>{
        // req.session.userLogged = false;
        // req.session = false;
        // res.locals.isLogged = false;
        req.session.destroy();
        return res.redirect('/');
    },
    validate: (req, res)=>{
      //  res.cookie('testing', 'Hola mundo', {maxAge: 1000 * 30});
        const resultsValidationLogin = validationResult(req);
        //console.log(req.cookies.testing); 
          if(resultsValidationLogin.errors.length > 0){
              return res.render('login', {
                  errors: resultsValidationLogin.mapped(),
                  oldData: req.body
              });
         }          
       
         //DB VALIDA
        // 'detail': (req, res) => {
          //  console.log('ya entre a detail')
            //db.Product.findByPk(req.params.id)
              //  .then(product => {
                //    res.render('products/productsCons', {product, toThousand});
                //});
        //},

        //
    
         //validando que le usuario exista
           let Uemail = req.body.email;
           let Upass = req.body.password;

           //let userFound = users.find(user => user.email === Uemail)
           db.User.findOne({
                where:{
                    email: Uemail
                }
           })
            .then((user) => {
                if(user){
                    let isOKUser = bcryptjs.compareSync(Upass, user.password);
                    if(isOKUser){
                        req.session.userLogged = user;
                        return res.redirect('/../userProfile');
                    }
                    else{
                    return res.render('login', {
                        errors:{
                            email:{
                             msg: 'Password incorrecto'
                            }
                        }
                    })
                    }
                }
                else{
                    return res.render('login', {
                        errors:{
                            email:{
                             msg: 'El usuario no existe'
                            }
                        }
                    })
                }
            });

           
//aqui entra si todo esta bien
        //    if (userFound){
        //     let isOKUser = bcryptjs.compareSync(req.body.password, userFound.password);
        //     if (isOKUser){
        //         delete userFound.password;
        //         req.session.userLogged = userFound;
        //         //return res.render('userProfile', {user: req.session.userLogged});
        //         return res.redirect('/../userProfile');
        //     }
        //     //password no coincide
        //     return res.render('login', {
        //         errors:{
        //             email:{
        //                 msg: 'Password incorrecto'
        //             }
        //         }
        //     });


           //}
        //    return res.render('login', {
        //        errors:{
        //            email:{
        //                msg: 'Usuario no existente'
        //            }
        //        }
        //    });
    },

    store: (req, res)=> {
         const resultsValidation = validationResult(req);
          if(resultsValidation.errors.length > 0){
              //console.log(resultsValidation.errors);
              return res.render('formulario', {
                  errors: resultsValidation.mapped(),
                  oldData: req.body
              })
         } 
         // mientras else {
        //DB
        
        let Uemail = req.body.email;
         db.User.findOne({
            where:{
                email: Uemail
            }
       })
        .then((user) => {
        if(user){
            return res.render('formulario', {
                errors:{
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
            oldData: req.body
            });
        }
        else{
            
             let image
                
              if (req.files[0] != undefined) {
                   image = req.files[0].filename
              } else {
                  image = 'default-image.png'
              }

            db.User.create(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password,10),
                    gender: req.body.gender,
                    date: req.body.date,
                    image: image
                },
            )
            .then((user)=> {
                req.session.userLogged = user
                return res.redirect('/../userProfile')})
            .catch(error => res.send(error))
        }
        
    });

            // if (userInDB){
            //     return res.render('formulario', {
            //         errors:{
            //             email: {
            //                 msg: 'Este email ya esta registrado'
            //             }
            //         },
            //     oldData: req.body
            //     });
            // }
         
            
        //     let image
                
        //      if (req.files[0] != undefined) {
        //           image = req.files[0].filename
        //           console.log(image);
        //      } else {
        //          image = 'default-image.png'
        //     }

        //     let passHash =bcryptjs.hashSync(req.body.password, 10);
            

        //     let newUser = {
        //         id: users[users.length - 1].id + 1,
        //         ...req.body,
        //         password: passHash,
        //         password2: '',
        //         image: image
        //     };
            
        //     users.push(newUser)

        //     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        //     res.redirect('/login');    
        // //mientras}
    },
    // findByPk: (req, res) => {
    //     //console.log(req.params.id);
    //     let id = req.params.id;
    //     let userFound = users.find(users => user.id == id)
    //     console.log("buscando");
    //     //res.render('products/productsCons', {
    //         //product,
    //         //toThousand
    //     //});
    // },
}

module.exports = controller;