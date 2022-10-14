const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: Object,
        required: [true, 'Please enter your user id'],
    },
    sceneryId: {
        type: Object,
        required: [true, 'Please enter your scenery id'],
    },
    fildId: {
        type: String,
        require: [true, 'Please enter fild of the scenery'],
    },
    price: {
        type: Number,
        require: [true, 'Please enter price'],
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingTime: {
        type: String,
        require: [true, 'Please enter your busy time'],
    },
    status: {
        type: String,
        default: 'active',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };