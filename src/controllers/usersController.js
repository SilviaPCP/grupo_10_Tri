const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs'); 

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersImageFolder = path.join(__dirname, '/../public/images/users');

// traer las validacinoes de formulario
const { validationResult } = require('express-validator');

const controller = {
    index: (req,res) =>{
        res.render('formulario')
    },
    login: (req,res)=>{
        res.render('login');
    },

    validate: (req, res)=>{
        const resultsValidationLogin = validationResult(req);
          if(resultsValidationLogin.errors.length > 0){
              return res.render('login', {
                  errors: resultsValidationLogin.mapped(),
                  oldData: req.body
              })
         } else{
            res.redirect('/'); 
         }
    },

    store: (req, res)=> {
         const resultsValidation = validationResult(req);
          if(resultsValidation.errors.length > 0){
              return res.render('formulario', {
                  errors: resultsValidation.mapped(),
                  oldData: req.body
              })
         } 
         else {
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
            res.redirect('/');    
        }
    }
}

module.exports = controller;