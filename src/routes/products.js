// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

//CONFIG MULTER//
const multer = require('multer');
const { log } = require('console');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname,'../../public/images/products/'));
    },
    filename: (req, file, cb)=>{
        const newFilename = Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const upload = multer({storage:storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/store/', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;