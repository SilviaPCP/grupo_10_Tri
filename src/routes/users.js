// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

//CONFIG MULTER//
const multer = require('multer');

const guestMiddleware = require('../middlewares/guestMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


//requerir validator
const { body } = require('express-validator');
// arreglo de validaciones 
const validations = [
    body('firstName').notEmpty().withMessage('Escribe tu nombre'),
    body('lastName').notEmpty().withMessage('Escribe tu apellido'),
    body('email').notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Debe tener un formato de correo electrónico'),
    body('password').notEmpty().withMessage('Escribe tu password'),
    body('gender').notEmpty().withMessage('Selecciona tu género'),
    body('date').notEmpty().withMessage('Captura tu fecha de nacimiento'),
    body('password').custom((value, { req })=>{
        if(value!== req.body.password2){
            throw new Error('Los passwords no coinciden');
        }
        return true;
    })
    // body('image').custom((value, { req })=>{
    //     let file = req.file;
    //     if(!file) {
    //         throw new Error('Selecciona una imagen');
    //     }       
    //     return true;
    // })
]

const validationsLogin = [
    body('email').notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Debe tener un formato de correo electrónico'),
    body('password').notEmpty().withMessage('Escribe tu password')
]



//router.get('/create', usersController.create);
router.get('/', usersController.index);
router.get('/login', usersController.login);
router.post('/', upload.any(), validations, usersController.store);
router.post('/login', upload.any(), validationsLogin, usersController.validate);
router.get('/', usersController.profile);

//router.post('/', usersController.store);

//router.post('/',upload.single('image'), validations, mainController.processForm);

module.exports = router;