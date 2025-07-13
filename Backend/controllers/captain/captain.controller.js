const captainModal = require('../../models/captain.modal');
const { validationResult } = require('express-validator');
const captainService = require('../../services/captain.service');

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