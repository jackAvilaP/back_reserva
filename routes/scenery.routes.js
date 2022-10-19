const express = require('express');

//Controllers
const { createScenery, getSceneryAll, getSceneryById } = require('../controllers/scenery.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { sceneryExists } = require('../middlewares/scenery.middleware');

//utlis
const { upload } = require('../utils/multer');


const scenerysRouter = express.Router();

scenerysRouter.use(protectSession);
scenerysRouter.post('/', upload.single('sceneryImg'), createScenery);
scenerysRouter.get('/sceneryAll', getSceneryAll);
scenerysRouter.get('/:id',sceneryExists, getSceneryById);

module.exports = { scenerysRouter };