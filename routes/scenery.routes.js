const express = require('express');

//Controllers
const { createScenery } = require('../controllers/scenery.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');

const scenerysRouter = express.Router();

scenerysRouter.use(protectSession);
scenerysRouter.post('/', createScenery);

module.exports = { scenerysRouter };