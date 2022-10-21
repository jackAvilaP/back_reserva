const express = require('express');
const fildRouter = express.Router();

//Controllers
const { createFild, getFildById, getFildAll } = require('../controllers/fild.controller');

//Middlewares
const { fildExists } = require('../middlewares/fild.middleware');

//utlis
const { upload } = require('../utils/multer');


fildRouter.post('/', upload.array('fildImgs', 2),createFild);

fildRouter.get('/findAll', getFildAll);

fildRouter.get('/:id', fildExists, getFildById);

fildRouter.get('/:id')

module.exports = { fildRouter };