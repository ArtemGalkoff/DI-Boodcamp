import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (userId: number) => {
  socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("registerUser", userId); // передаём userId
  });

  return socket;
};

export const getSocket = (): Socket => socket;

