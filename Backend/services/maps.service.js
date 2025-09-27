const axios = require('axios');
const captainModal = require('../models/captain.modal');

module.exports.getAddressCoordinates = async(address)=>{
   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
   try{
      const response = await axios.get(url);
        if(response.data.status === 'OK'){
             const location = response.data.results[0].geometry.location;
             return {
                lat: location.lat,
                lng: location.lng
             }; 
        } else {
             throw new Error('Unable to fetch coordinates');
        }
   }

   catch(error){
      console.error('Error fetching coordinates:', error.message);
      throw new Error('Error fetching coordinates: ' + error.message);
   }
}

module.exports.getDistanceAndTime = async(origin, destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const element = response.data.rows[0].elements[0];
            if(element.status === 'OK'){
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                };
            } else {
                throw new Error('Unable to fetch distance and time');
            }
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    }

    catch(error){
        console.error('Error fetching distance and time:', error.message);
        throw new Error('Error fetching distance and time: ' + error.message);
    }
}

module.exports.getAutoCompleteSuggestions = async(input)=>{
    if(!input){
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        // response.data.predictions.map(prediction => prediction.description);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    }

    catch(error){
        console.error('Error fetching suggestions:', error.message);
        throw new Error('Error fetching suggestions: ' + error.message);
    }
}


module.exports.getNearByLocationSuggestions = async (input, lat, lng, radius = 2) => {
  if (!lat || !lng || !radius) {
    throw new Error("Latitude, Longitude and radius are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${
    radius * 1000
  }&keyword=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      // Extract address-like suggestions
      const rawSuggestions = response.data.results.map(
        (place) => place.vicinity || place.formatted_address || place.name
      );

      // Remove duplicates + limit to 10
      const uniqueSuggestions = [...new Set(rawSuggestions)].slice(0, 10);

      return uniqueSuggestions; // return array only
    } else {
      throw new Error("Unable to fetch nearby location suggestions");
    }
  } catch (error) {
    console.error("Error fetching nearby location suggestions:", error.message);
    throw new Error("Error fetching nearby location suggestions: " + error.message);
  }
};


module.exports.getCaptainsInTheRadius = async (ltd, lng, radiusInMiles) => { 
   const captains = await captainModal.find({
        location: {
            $geoWithin: { 
                $centerSphere: [ [ ltd, lng ], radiusInMiles / 3963.2 ] // radius in radians (3963.2 miles = Earth's radius)
            }
        },
         
   });  

   return captains;
}

