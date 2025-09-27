const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {getCoordinates, getDistanceTime, getSuggestions,getnearbylocsuggestions} = require('../controllers/maps/maps.controller');
const {query} = require('express-validator');

router.get('/get-coordinates', query('address').isString().isLength({min : 3}),authMiddleware.authUser, getCoordinates);
router.get('/get-distance-time', query('origin').isString().isLength({min : 3}), query('destination').isString().isLength({min : 3}), authMiddleware.authUser, getDistanceTime);
router.get('/get-suggestions', query('input').isString().isLength({min : 1}), authMiddleware.authUser,getSuggestions);
router.get('/getnearbylocsuggestions', query('lat').isFloat(), query('lng').isFloat(), query('radius').isInt(), authMiddleware.authUser, getnearbylocsuggestions);
module.exports = router;