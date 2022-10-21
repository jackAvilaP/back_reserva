//Models 
const { Sport } = require("../models/sport.model");
const { Scenery } = require("../models/scenery.model");
//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { appError, AppError } = require("../utils/appError.util");


const createSport = catchAsync(async (req, res, next) => {

    const { nameSport, sceneryId, SportId, status } = req.body;

    const sportExist = await Sport.findOne({ nameSport })
    const scenerySearch = await Scenery.findOne({ sceneryId })

    if (sportExist) {
        return next(new AppError('the sport already exists', 400))
    }

    if (!scenerySearch) {
        return next(new appError('not exist scenery', 401))
    }
    const newSport = await Sport.create({
        nameSport,
        sceneryId: scenerySearch,
        status
    });

    scenerySearch.user = undefined;
    res.status(201).json({
        status: 'success',
        newSport
    })
});

const getSportById = catchAsync(async (req, res, next) => {
    const { sport } = req;

    res.status(201).json({
        status: 'success',
        sport,
    })
});

const getSportAll = catchAsync(async (req, res, next) => {

    const sportAlls = await Sport.find({});

    res.status(201).json({
        status: 'success',
        sportAlls,

    });
})

module.exports = { createSport, getSportById, getSportAll };