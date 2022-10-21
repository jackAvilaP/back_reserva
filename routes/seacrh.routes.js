const express = require('express');
const searchRouter = express.Router();

const { searchFilter } = require('../controllers/seach.controller');

searchRouter.get('/',searchFilter);

module.exports = { searchRouter };
