
const { Sport } = require("../models/sport.model");

const { catchAsync } = require("../utils/catchAsync.util");

const sportExist = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const sport = await Sport.findOne({ _id: id });

    if (!sport) {
        return next(new AppError('sport no found', 404));
    }

    req.sport = sport;

    next();
});

module.exports = { sportExist };