const mongoose = require('mongoose');

const rideSchema= new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    captain :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },

    pickup : {
        type: String,
        required: true
    },
    destination : {
        type: String,
        required: true
    },

    fare : {
        type: Number,
        required: true
    },

    status : {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },

    duration : {
        type: Number,
    },  // in seconds

    distance :  {
        type: Number,
    },  // in meters

    paymentID : {
        type : String,
    },

    orderId : {
        type : String,
    },

    otp:{
        type : String,
        select : false
    },

    signature : {
        type : String,
    },
});


const rideModal = mongoose.model('ride',rideSchema);

module.exports = rideModal;