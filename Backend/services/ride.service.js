const rideModal = require('../models/ride.modal');
const { sendMessageToSocketId } = require('../socket');
const { getDistanceAndTime } = require('./maps.service');
const crypto = require('crypto');


const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Origin and destination are required');
    }

    const DistanceAndTime = await getDistanceAndTime(pickup, destination);
    console.log(DistanceAndTime);

    const distanceKm = parseFloat(DistanceAndTime.distance.replace('km', '').trim());
    const durationMins = parseFloat(DistanceAndTime.duration.replace('mins', '').trim());

    // Convert km to miles for US pricing
    const distanceMiles = distanceKm * 0.621371;

    // Fare rates for US market
    const fareRates = {
        car: { base: 2.5, perMile: 2, perMin: 0.35 },
        motorcycle: { base: 1.5, perMile: 1.2, perMin: 0.25 },
        auto: { base: 2, perMile: 1.5, perMin: 0.3 }
    };

    const fare = Object.entries(fareRates).reduce((acc, [type, rate]) => {
        acc[type] = Math.round((rate.base + (distanceMiles * rate.perMile) + (durationMins * rate.perMin)) * 100) / 100; // round to 2 decimals
        return acc;
    }, {});

    return fare;
};


const getOTP = (num) => {
  const randomInt = parseInt(crypto.randomBytes(4).toString('hex'), 16);
  const otp = (randomInt % Math.pow(10, num)).toString().padStart(num, '0');  
  return otp;
};

const createRide = async ({userId,pickup,destination,vehicleType})=>{
  if(!userId || !pickup || !destination || !vehicleType){
      throw new Error('All fields are required');
  }
//   console.log({ userId, pickup, destination, vehicleType});

  const fare = await getFare(pickup, destination);
  console.log({
      userId,
      pickup,
      destination,
      fare: fare[vehicleType],
  });

  const ride = rideModal.create({
      user:userId,
      pickup,
      destination,
      fare: fare[vehicleType],
      otp : getOTP(4),
  });

  return ride;
}


const ConfirmRide = async(rideId,CaptainId)=>{
    if(!rideId || !CaptainId){
        throw new Error('Ride Id and Captain Id are required!');
    }

   await rideModal.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ACCEPTED',
        captain: CaptainId
    })

    const ride = await rideModal.findOne({_id: rideId}).populate('captain').populate('user').select('+otp');
    
    if(!ride){
        throw new Error('Ride not found!');
    }
    
    return ride;
}

const StartRide = async(rideId, CaptainId, otp)=>{
    if(!rideId || !CaptainId || !otp){
        throw new Error('Ride Id, Captain Id and OTP are required!');
    }
    const ride = await rideModal.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found!');
    }

    if(ride.status !== 'ACCEPTED'){
        throw new Error('Ride not accepted yet!');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP!');
    }     
    
     const rideStatusUpdated = await rideModal.findOneAndUpdate(
    { _id: rideId },
    { status: "ONGOING" },
    { new: true, runValidators: true }
  );

    sendMessageToSocketId(ride.user.socketId,{
            event : 'ride-started', 
            data: ride,
    });
    
    return rideStatusUpdated;
}


const EndRide = async({rideId, Captain})=>{ 

    if(!rideId || !Captain){
        throw new Error('Ride Id and Captain Id are required!');
    }   
    const ride = await rideModal.findOne({_id: rideId, captain:Captain._id}).populate('user').populate('captain');
    if(!ride){
        throw new Error('Ride not found!');
    }
    if(ride.status !== 'ONGOING'){
        throw new Error('Ride not started yet!');
    }
        const rideStatusUpdated = await rideModal.findOneAndUpdate(
        { _id: rideId, captain:Captain._id },
        { status: "COMPLETED" },
        { new: true, runValidators: true }
      );
      
        return rideStatusUpdated;
}

module.exports = {
    getFare,
    createRide,
    ConfirmRide,
    StartRide,
    EndRide,
}