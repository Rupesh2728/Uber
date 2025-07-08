const userModal = require('../models/user.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorised' });
    } 

    const isBlacklisted = await blacklistTokenModel.findOne({token:token})
    if(isBlacklisted)
    {
        return res.status(401).json({ message: 'Unauthorised' });
    }

    try{
         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
         const user = await userModal.findById(decodedToken._id);
         if(!user)
         {
                return res.status(404).json({ message: 'User not found' });
         }
         req.user = user;

         return next();
    }
    catch(err)
    {
         return res.status(404).json({ message: err });
    }
}