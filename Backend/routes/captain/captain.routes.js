const express = require('express');
const router = express.Router();
const {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain} = require('../../controllers/captain/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 5 }).withMessage('Please enter a valid vehicle plate number'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle, or auto')
],registerCaptain);


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
],loginCaptain);


router.get('/profile', authCaptain,getCaptainProfile);

router.get('/logout', authCaptain, logoutCaptain);


module.exports = router;