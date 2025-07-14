const captainModal = require('../../models/captain.modal');
const { validationResult } = require('express-validator');
const captainService = require('../../services/captain.service');
const blacklistTokenModel = require('../../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    // console.log(req.body);
    
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

  
   const { fullname, email, password } = req.body;
   const { color, plate, capacity, vehicleType } = req.body.vehicle;
   
   const isCaptainExists = await captainModal.findOne({email});
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

   const hashpswd = await captainModal.hashPassword(password);

   const captain = await captainService.createCaptain({
     fullname,
        email,
        password: hashpswd,
        color,
        plate,
        capacity,
        vehicleType,
   });

    if (!captain) {
        return res.status(500).json({ message: 'Error creating captain' });
    }
   const token = captain.generateAuthToken();

   return res.status(201).json({
      token,captain
   });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModal.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Captain doesnot exist' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({
        token, captain
    });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    if (!req.captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    // console.log(req.captain);
    
    return res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    return res.status(200).json({ message: 'Logged out successfully' });
}


