const express = require('express'); 
const router = express.Router();
const {body, query} = require('express-validator');
const { createRideController,getFareController, ConfirmRideController,StartRideController, EndRideController } = require('../../controllers/ride/ride.controller');
const { authUser,authCaptain } = require('../../middlewares/auth.middleware');

router.post('/create',authUser,[
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination Location'),
    body('vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type')
],createRideController);


router.get('/get-fare',authUser,[
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid Destination Location'),
], getFareController)

router.post('/confirm',authCaptain, [body('rideId').isMongoId().withMessage('Invalid ride id')],ConfirmRideController);

router.get('/start-ride', authCaptain, [query('rideId').isMongoId().withMessage('Invalid ride id'), query('otp').isString().withMessage('Invalid OTP')], StartRideController)

router.post('/end-ride', authCaptain, EndRideController);

module.exports = router;