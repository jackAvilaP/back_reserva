//Models 
const { Fild } = require('../models/fild.model');
const { Scenery } = require('../models/scenery.model');
const { Sport } = require('../models/sport.model');
const { AppError } = require('../utils/appError.util');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase');


const createFild = catchAsync(async (req, res, next) => {

    const { nameFild, sceneryId, sportId, fildImgUrl, rating, status } = req.body;


    const imgFildRef = ref(storage, `filds/${req.file.originalname}`);
    const imgUpload = await uploadBytes(imgFildRef, req.file.buffer);



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
        fildImgUrl: imgUpload.metadata.fullPath,
        rating,
    })

    res.status(201).json({
        status: 'success',
        newFild
    })
});
const getFildAll = catchAsync(async (req, res, next) => {
    // const { fild } = req;

    const findAlls = await Fild.find({});

    const fildPromises = findAlls.map(async findAll => {
        const imgRef = ref(storage, findAll);
    });

    const fildResolved = await Promises.all(fildPromises);

    res.status(201).json({
        status: 'success',
        findAlls
    })
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