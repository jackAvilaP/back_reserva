const express = require('express');

//Controllers
const { createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller');


//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { bookingExists } = require('../middlewares/booking.middleware');


const bookingsRouter = express.Router();

bookingsRouter.use(protectSession);

bookingsRouter.post('/',createBooking);

bookingsRouter.patch('/:id', bookingExists, updateBooking);

bookingsRouter.delete('/:id', bookingExists, deleteBooking);

module.exports = { bookingsRouter };