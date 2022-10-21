//Models 
const { Fild } = require('../models/fild.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require("../utils/catchAsync.util");

const fildExists = catchAsync(async(req, res, next) => {

    const { id } = req.params;

    const fild = await Fild.findOne({_id:id});

    if(!fild){
        return next(new AppError('fild no found', 404));
    }

    req.fild = fild;

    next();
});


module.exports = { fildExists };