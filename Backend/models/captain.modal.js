const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname: {
            type : String,
            required: true,
            minlength: [3,'Fisrt name must be at least 3 characters long'],
        },

        lastname : {
            type : String,
            minlength: [3,'Last name must be at least 3 characters long'],
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
    },

    password : {
        type : String,
        required : true,
        minlength: [6,'Password must be at least 6 characters long'],
        select: false
    },

    socketId :{
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color : {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },

        plate : {
            type: String,
            required: true,
            unique: true,
            // match: [/^[A-Z0-9]{1,10}$/, 'Please enter a valid vehicle plate number']
        },

        capacity : {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {
        lat : {
            type : Number,
        },

        lng : {
            type : Number,
        }
    }
});


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModal = mongoose.model('captain', captainSchema);

module.exports = captainModal;