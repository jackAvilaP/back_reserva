//Models 
const { Sport } = require("../models/sport.model");
const { Scenery } = require("../models/scenery.model");
//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { appError, AppError } = require("../utils/appError.util");


//utils


//middleware


const createSport = catchAsync(async( req, res, next) => {

    const { nameSport, sceneryId, fildId, status } = req.body;

    const sportExist = await Sport.findOne({ nameSport })
    const scenerySearch = await Scenery.findOne({ sceneryId })

    if(sportExist){
        return next(new AppError('the sport already exists', 400))
    }

    if(!scenerySearch){
        return next(new appError('not exist scenery', 401))
    }
    const newSport = await Sport.create({
        nameSport,
        sceneryId:scenerySearch,
        status
    });

    scenerySearch.user  = undefined;
    res.status(201).json({
        status:'success',
        newSport
    })
});

module.exports = { createSport };