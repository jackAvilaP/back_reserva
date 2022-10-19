//Models 
const { Scenery } = require('../models/scenery.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require("../utils/catchAsync.util");

const sceneryExists = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const scenery = await Scenery.findOne({ _id: id });

    if (!scenery) {
        return next(new AppError('scenery no found', 404));
    }

    req.scenery = scenery;

    next();
});

module.exports = { sceneryExists };