require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then((db) => {
    console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// Socket.io connection handling
let loggedUsers = [null, null, null];

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("click", (data) => {
    loggedUsers[data.buttonIndex] = socket.id;
    io.emit("update", loggedUsers);
  });

  socket.on("send_message", (msg, room, user) => {
    console.log(user.username + ": " + msg);
    if (room) {
      console.log("room targeted ", room);
      socket.broadcast.emit("receive-message", msg);
      // socket.broadcast.emit('receive-message', msg);
    } else {
      console.log("no room");
      socket.to(room)("receive-message", msg);
    }
  });
  // Handle room deletion
  socket.on("deleteRoom", (roomId) => {
    if (roomId) {
      console.log("Deleting room", roomId);
      socket.broadcast.emit("roomDeleted", { roomId });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    let removeUserFromArray = loggedUsers.map((userId) => (userId === socket.id ? null : userId));
    loggedUsers = removeUserFromArray;
    bt = [null, null, null];
    console.log(removeUserFromArray);
    io.emit("update", removeUserFromArray);
  });

  // Send initial user state to the newly connected client

  socket.emit("updateUsers", loggedUsers);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const storyRoutes = require("./routes/story.routes");

app.use("/stories", storyRoutes);
