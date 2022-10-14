const mongoose = require('mongoose');

const fildImgSchema = new mongoose.Schema({

    fildUrl:{
        type:String,
        required: [true, 'Please enter your image']
    },
    fildId:{
        type:String,
        required: [true, 'Please enter id fildId']

    },
    status: {
        type: String,
        default: 'active',
    },

});

const fildImg = mongoose.model('fildImg', fildImgSchema);

module.exports = { fildImg };