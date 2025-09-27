import React, { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SOCKET_SERVER_URL = `${import.meta.env.VITE_BASE_URL}`;  

const SocketProvider = ({ children }) => { 
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });  

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
    }); 

  }, []);

  // Send message to a specific event
  const sendMessage = (eventName, message) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, message);
    }

    else {
      console.error("Socket not connected");
    }
  };

  // Listen for messages from a specific event
  const receiveMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }

    else {
      console.error("Socket not connected");
    }
  };

const sendLocationUpdate = (captainId, location) => {
    if (socketRef.current) {
      socketRef.current.emit('update-captain-location', { captainId, location }); 
      console.log("Location update sent:", { captainId, location });
    } else {
      console.error("Socket not connected");
    }
  };
 
  return (
    <SocketContext.Provider
      value={{ sendLocationUpdate,sendMessage, receiveMessage, socket: socketRef.current }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
