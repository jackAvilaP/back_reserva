//Models
const { Scenery } = require('../models/scenery.model');
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

//Middleware
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

const createScenery = catchAsync(async (req, res, next) => {

    const { sceneryName, location: { lat, long }, description, rating } = req.body;

    const imgScenerysRef = ref(storage, `scenerys/${req.file.originalname}`);
    const imgScenerys = await uploadBytes(imgScenerysRef, req.file.buffer);


    const { sessionUser } = req;
    const user = await User.findById(sessionUser._id);

    const sceneryExist = await Scenery.findOne({ sceneryName });

    if (sceneryExist) {
        return next(new AppError('busy scenery name', 400));
    }

    user.password = undefined;

    const newScenery = await Scenery.create({
        sceneryName,
        location: { lat, long },
        description,
        sceneryImgUrl: imgScenerys.metadata.fullPath,
        rating,
        user
    });

    res.status(201).json({
        status: 'success',
        newScenery
    });

});


const getSceneryAll = catchAsync(async (req, res, next) => {

    const sceneryAlls = await Scenery.find({});
    
    const sceneryPromises = sceneryAlls.map(async sceneryAll => {
        const imgRef = ref(storage, sceneryAll.sceneryImgUrl);
        sceneryAll.sceneryImgUrl = await getDownloadURL(imgRef);
        return  sceneryAll;
    });

    const sceneryResolved = await Promise.all( sceneryPromises);

    res.status(201).json({
        status: 'success',
        sceneryResolved
    })
});

const getSceneryById = catchAsync(async (req, res, next) => {

    const { scenery } = req;

    const imgRef = ref(storage, scenery.sceneryImgUrl);
    scenery.sceneryImgUrl = await getDownloadURL(imgRef);

    //console.log(sceneryAll[1].sceneryImgUrl)
    res.status(201).json({
        status: 'success',
        scenery,
    })
});

module.exports = { createScenery, getSceneryAll, getSceneryById };