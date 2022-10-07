const express = require('express');

//Controllers
const { createSport } = require('../controllers/sport.controller');

const sportRouter = express.Router();

sportRouter.use('/', createSport);

module.exports = { sportRouter };