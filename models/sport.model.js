const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    nameSport:{
        type:String,
        required: [true, 'Please enter you name sport '],
    },
    sceneryId:{
        type:Object,
        required: [true, 'Please enter you scenary'],
    },
    status: {
        type: String,
        default: 'active',
    },
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = { Sport }