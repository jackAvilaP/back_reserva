const express = require('express');

//Controllers
const { createFild, getFildById } = require('../controllers/fild.controller');

//Middlewares
const { fildExists } = require('../middlewares/fild.middleware');

//utlis
const { upload } = require('../utils/multer');

const fildRouter = express.Router();

fildRouter.post('/',upload.single('fildImg'),
createFild);

fildRouter.get('/:id', fildExists, getFildById);

module.exports = { fildRouter };