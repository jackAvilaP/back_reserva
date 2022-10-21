const { Fild } = require('../models/fild.model');
const { Scenery } = require('../models/scenery.model');
const { Sport } = require('../models/sport.model');
const { Booking } = require('../models/booking.model');

const { catchAsync } = require('../utils/catchAsync.util');

const searchFilter = catchAsync(async (req, res, next) => {

    const nameSport = req.query.nameSport;
    const country = req.query.country;
    const city = req.query.city;
    const date = req.query.date;


    const SceneryCityExists = await Scenery.findOne({
        city,
    });

    const SceneryCountryExists = await Scenery.findOne({
        country,
    });

    const SportExists = await Sport.findOne({
        nameSport,
    });


    const bookingExists = await Booking.findOne({
        bookingDate: date,
    });
    
    if (SportExists) {
        resultFild = await Fild.findOne({ sportId: SportExists.id })
        console.log(resultFild);
    }


    //console.log(SceneryCountryExists);
    res.status(201).json({
        status: 'success',
        //bookingExists
    })
});

module.exports = {
    searchFilter
}