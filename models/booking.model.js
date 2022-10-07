const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId:{
        type:Object,
        required: [true, 'Please enter your user id'],
    },
    sceneryId:{
        type:Object,
        required: [true, 'Please enter your scenery id'],
    },
    price: {
        type: Number,
    },
    bookingDate:{
        type: Date,
        default: Date.now
    },
    bookingTime: {
        type:String,
        require: [true, 'Please enter your busy time'],
    },
    status: {
        type: String,
        default: 'active',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {Booking};