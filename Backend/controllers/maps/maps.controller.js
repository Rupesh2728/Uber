const { getAddressCoordinates,getDistanceAndTime,getAutoCompleteSuggestions, getNearByLocationSuggestions } = require("../../services/maps.service");
const { validationResult } = require('express-validator');

const getCoordinates = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

   const { address } = req.query;               
    try{
         const coordinates = await getAddressCoordinates(address);
         return res.status(200).json({coordinates});
    }
    catch(error){
         return res.status(404).json({message: 'INTERNAL SERVER ERROR'});
    }
}


const getDistanceTime = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { origin, destination } = req.query;
    try{
        const distanceTime = await getDistanceAndTime(origin, destination);
        return res.status(200).json(distanceTime);
    }
    catch(error){
        return res.status(404).json({message: 'INTERNAL SERVER ERROR'});
    }
}


const getSuggestions = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { input } = req.query;
    try{
        const suggestions = await getAutoCompleteSuggestions(input);
        return res.status(200).json({suggestions});
    }
    catch(error){
        return res.status(404).json({message: 'INTERNAL SERVER ERROR'});
    }
}


const getnearbylocsuggestions = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }   
    const { lat, lng, radius } = req.query;
    try{
        const suggestions = await getNearByLocationSuggestions("",lat, lng, radius);
        return res.status(200).json({suggestions});
    }
    catch(error){
        return res.status(404).json({message: 'INTERNAL SERVER ERROR'});
    }
}

module.exports={
    getCoordinates,
    getDistanceTime,
    getSuggestions,
    getnearbylocsuggestions
}