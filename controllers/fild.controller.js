//Models 
const { Fild } = require('../models/fild.model');
const { Scenery } = require('../models/scenery.model');
const { AppError } = require('../utils/appError.util');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');


const createFild = catchAsync(async( req, res, next ) => {

    const { nameFild, sceneryId,  busyTime, rating, status } = req.body;

    const sceneryExist = await Scenery.findOne({ sceneryId });
    const busyTimeExist = await Fild.findOne( { busyTime } );

    if( !sceneryExist ){
        return next(new AppError('dont exist scenery',404));
    }

    if(busyTimeExist){
        return next(new AppError('pleace entry other Time ', 401))
    }

    sceneryExist.location = undefined;
    sceneryExist.user = undefined;
    sceneryExist.rating = undefined;

    const newFild = await Fild.create({ 
        nameFild,
        sceneryId: sceneryExist,
        rating,
    })

    res.status(201).json({
        status:'success',
        newFild
    })
});

module.exports = { createFild };