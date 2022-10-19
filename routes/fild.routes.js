const express = require('express');

//Controllers
const { createFild, getFildById, getFildAll } = require('../controllers/fild.controller');

//Middlewares
const { fildExists } = require('../middlewares/fild.middleware');

//utlis
const { upload } = require('../utils/multer');

const fildRouter = express.Router();

fildRouter.post('/', upload.array('fildImgs', 4),
    createFild);

fildRouter.get('/findAll', getFildAll);

fildRouter.get('/:id', fildExists, getFildById);

module.exports = { fildRouter };