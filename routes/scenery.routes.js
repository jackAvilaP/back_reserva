const express = require('express');

//Controllers
const { createScenery } = require('../controllers/scenery.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');

//utlis
const { upload } = require('../utils/multer');


const scenerysRouter = express.Router();

scenerysRouter.use(protectSession);
scenerysRouter.post('/', upload.single('sceneryImg'), createScenery);

module.exports = { scenerysRouter };