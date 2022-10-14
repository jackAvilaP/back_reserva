//Models 
const { Booking } = require('../models/booking.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require("../utils/catchAsync.util");

const bookingExists = catchAsync(async(req, res, next) => {

    const { id } = req.params;

    const booking = await Booking.findOne({_id:id});

    if(!booking){
        return next(new AppError('Booking no found', 404));
    }

    req.booking = booking;

    next();
});

module.exports = { bookingExists };