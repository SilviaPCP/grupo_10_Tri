const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersImageFolder = path.join(__dirname, '/../public/images/users');

// traer las validacinoes de formulario
const { validationResult } = require('express-validator');

const controller = {
    index: (req,res) =>{
        res.render('formulario')
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
    
            let newUser = {
                id: users[users.length - 1].id + 1,
                ...req.body,
                image: image
            };
            users.push(newUser)

            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/');    
        }
    }
}

module.exports = controller;