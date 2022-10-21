const express = require('express');
const sportRouter = express.Router();

//Controllers
const { createSport, getSportById, getSportAll } = require('../controllers/sport.controller');

const { sportExist } = require('../middlewares/sport.middleware');


sportRouter.post('/', createSport);
sportRouter.get('/sportAll', getSportAll);
sportRouter.get('/:id', sportExist, getSportById);

module.exports = { sportRouter };