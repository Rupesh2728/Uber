const { Server } = require("socket.io");
const userModal = require("./models/user.modal");
const captainModal = require("./models/captain.modal");

let io = null;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);

    socket.on('join',async (data)=>{  
        const {userId,userType} = data;
        if(userType ==='user')
        {
            await userModal.findByIdAndUpdate(userId,{
                socketId : socket.id
            })
        }
        else if(userType ==='captain')
        {
            await captainModal.findByIdAndUpdate(userId,{
                socketId : socket.id
            })
        }
        // console.log(`${userType} with ID ${userId} joined with socket ID ${socket.id}`);      
    })

    socket.on('update-captain-location', async(data)=>{
        const {captainId,location} = data;
        console.log(location);
        if (!location) {
        return;
        }
        const { ltd, lng } = location;
        if (!ltd || !lng) {
         throw new Error("Both latitude (ltd) and longitude (lng) are required.");
       }

       try{
        await captainModal.findByIdAndUpdate(captainId, {
          location: { ltd: location.ltd, lng:location.lng }
        });


     console.log(`Updated location for captain ID ${captainId}:`, location);
       }

        catch(error){
          console.error('Error updating captain location:', error.message);
          throw new Error('Error updating captain location: ' + error.message);
        }
            
    })  

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

const sendMessageToSocketId=(socketId,messageObj)=> {
  console.log(`Sending message to ${socketId}:`, messageObj);
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.error("Socket.io not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
