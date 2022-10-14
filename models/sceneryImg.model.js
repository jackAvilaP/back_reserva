const mongoose = require('mongoose');

const sceneryImgSchema = new mongoose.Schema({

    sceneryUrl:{
        type:String,
        required: [true, 'Please enter your image']
    },
    SceneryId:{
        type:String,
        required: [true, 'Please enter id sceneryId']

    },
    status: {
        type: String,
        default: 'active',
    },

});

const SceneryImg = mongoose.model('SceneryImg', sceneryImgSchema);

module.exports = { SceneryImg };