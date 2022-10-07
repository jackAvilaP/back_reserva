//Models
const { Scenery } = require('../models/scenery.model');
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

//Middleware


const createScenery = catchAsync(async(req, res, next) => {

    const { sceneryName, location:{ lat, long }, description, rating } = req.body;

    const { sessionUser } = req;
    const user = await User.findById(sessionUser._id);

    const sceneryExist = await Scenery.findOne({ sceneryName });

    if( sceneryExist ){
        return next(new AppError('busy scenery name',400));
    }

    user.password = undefined;

    const newScenery = await Scenery.create({
        sceneryName,
        location:{ lat, long },
        description,
        rating,
        user
    });

    res.status(201).json({
        status:'success',
        newScenery
    });

});

module.exports = { createScenery };