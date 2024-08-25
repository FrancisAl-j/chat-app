import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config.js";
import Chat from "./models/chatModel.js";

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

const PORT = 3000;

app.get("/chatHistory", async (req, res) => {
  const messages = await Chat.find();
  res.status(200).json(messages);
});

// Handle socket events
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
  connectDB();
});
