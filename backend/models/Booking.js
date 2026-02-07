const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', 
    required: true 
  },
  customerName: { 
    type: String, 
    required: true 
  },
  bookingDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Booking', bookingSchema);