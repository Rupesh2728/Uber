const {validationResult} = require('express-validator');
const { createRide,getFare,ConfirmRide, StartRide, EndRide } = require('../../services/ride.service');
const { getAddressCoordinates, getCaptainsInTheRadius } = require('../../services/maps.service');
const { sendMessageToSocketId } = require('../../socket');
const rideModal = require('../../models/ride.modal');
const userModal = require('../../models/user.modal');


module.exports.createRideController = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination, vehicleType } = req.body;
    // console.log({ userId: req.user._id, pickup, destination, vehicleType});
    
    try{
        const ride = await createRide({ userId: req.user._id, pickup, destination, vehicleType});
        ride.otp = '';
        console.log({message: 'Ride created successfully'});
        const pickupCoords = await getAddressCoordinates(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(pickupCoords.lat, pickupCoords.lng, 5); // 5 miles radius
        console.log('Captains in radius:', captainsInRadius);

        const rideWithUserDetails = await rideModal.findById(ride._id).populate('user');
        console.log('Ride with user details:', rideWithUserDetails);
        
        captainsInRadius.map(async(captain)=>{
            sendMessageToSocketId(captain.socketId,{
                event : 'new-ride', 
                data: rideWithUserDetails,
            });
        })

        return res.status(201).json(ride);
    }

    catch(error){
        return res.status(500).json({error: error.message});
    } 
}


module.exports.getFareController = async (req,res,next)=>{

     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination } = req.query;

    // console.log(pickup, destination );

    try
    {
        const fare = await getFare(pickup, destination)
        return res.status(200).json(fare);
    }

    catch(err)
    {
        return res.status(500).json({message: err.message})
    }
}


module.exports.ConfirmRideController = async (req,res,next)=>{

     const errors = validationResult(req);  
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { rideId } = req.body;

    console.log(rideId, req.captain._id);

    try
    {
        const rideWithUserandCaptainDetails = await ConfirmRide(rideId,req.captain._id);
        if(!rideWithUserandCaptainDetails)
        {
            return res.status(404).json({message: 'Ride not found'});
        }
        console.log(rideWithUserandCaptainDetails);
        const user_socket_id = rideWithUserandCaptainDetails.user.socketId;
        sendMessageToSocketId(user_socket_id,{
                event : 'confirm-ride', 
                data: rideWithUserandCaptainDetails,
            });
        return res.status(200).json({message: 'Ride confirmed successfully'});      
    }
    catch(err)
    {
        return res.status(500).json({message: err.message})
    }       
}


module.exports.StartRideController = async (req,res,next)=>{
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }   

    const { rideId, otp } = req.query;

    try
    {
        const ride = await StartRide(rideId, req.captain._id,otp);   
        
        console.log('Started Ride');    
        return res.status(200).json(ride);
    }

    catch(err)
    {
        return res.status(500).json({message: err.message})
    }
}

module.exports.EndRideController = async (req,res,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;

    try{
        const ride = await EndRide({rideId, Captain: req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event : 'ride-completed', 
            data: ride,
        });
        return res.status(200).json(ride);
    }
    catch(err)
    {
        return res.status(500).json({message: err.message})
    }

}




