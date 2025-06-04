import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (userId: number) => {
  socket = io("https://lovestalker.onrender.com", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("registerUser", userId); 
  });

  return socket;
};

export const getSocket = (): Socket => socket;

