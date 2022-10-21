//Models 
const { Fild } = require('../models/fild.model');
const { Scenery } = require('../models/scenery.model');
const { Sport } = require('../models/sport.model');
const { FildImg } = require('../models/fildImg.model');

const { AppError } = require('../utils/appError.util');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase');


const createFild = catchAsync(async (req, res, next) => {

    const { nameFild, sceneryId, sportId, accountPerson, rating, price } = req.body;

    const sceneryExist = await Scenery.findById(sceneryId);
    const sportExist = await Sport.findById(sportId);

    if (!sceneryExist) {
        return next(new AppError('dont exist scenery', 404));
    }

    if (!sportExist) {
        return next(new AppError('dont exist sport', 404));
    }

    sceneryExist.location = undefined;
    sceneryExist.user = undefined;
    sceneryExist.rating = undefined;

    const newFild = await Fild.create({
        nameFild,
        sceneryId,
        sportId,
        accountPerson,
        rating,
        price
    })

    const fildPromises = req.files.map(async file => {

        const imgFildRef = ref(storage, `filds/${file.originalname}`);

        const imgUpload = await uploadBytes(imgFildRef, file.buffer);

        return await FildImg.create({
            fildId: newFild._id,
            fildUrl: imgUpload.metadata.fullPath
        })
    });

    const fildResolved = await Promise.all(fildPromises);

    res.status(201).json({
        status: 'success',
        newFild,
        fildResolved

    })
});

const getFildAll = catchAsync(async (req, res, next) => {

    const findAlls = await Fild.find({});
    const findImgAlls = await FildImg.find({})
    res.status(201).json({
        status: 'success',
        findAlls,
        findImgAlls
    });
});

const getFildById = catchAsync(async (req, res, next) => {
    const { fild } = req;

    const imgRef = ref(storage, fild.fildImgUrl);
    const urlFildImg = await getDownloadURL(imgRef);

    fild.fildImgUrl = urlFildImg;

    res.status(201).json({
        status: 'success',
        fild,
    })
});


    module.exports = { createFild, getFildById, getFildAll };