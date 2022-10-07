const express = require('express');

//Controllers
const { createFild } = require('../controllers/fild.controller');

const fildRouter = express.Router();

fildRouter.post('/', createFild);

module.exports = { fildRouter };