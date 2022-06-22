const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const randomCode = require("./utils/genrateCode");
const RESPONSES = require("./utils/RESPONSES");
const welcomeMsg = require("./utils/welcomeMsg");

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

rooms = {};
users = {};

io.on("connection", (client) => {
  users[client.id] = {
    username: "Anonymous",
    currentRoom: null,
    score: 0,
    isReady: false,
    isAnswered: false,
  };

  // CREATE BRAND NEW EMPTY ROOM
  client.on("create", () => {
    let id = randomCode();
    rooms[id] = {
      id,
      config,
      owner: client.id,
      readyCount: 0,
      userCount: 0,
      isRunning: false,
      currentWord: undefined,
      users: [],
    };
    callback({ ...RESPONSES.CREATED_ROOM, data: { id } });
  });

  // UPDATE PROFILE (HERE USERNAME ONLY)
  client.on("updateProfile", ({ username }) => {
    users[client.id].username = username;
    if (client.currentRoom) updateRoom(client);
  });

  // JOIN CLIENT TO PERTICULAR ROOM
  client.on("join", (roomid, callback) => {
    joinRoom(client, roomid, callback);
  });

  client.on("leave", () => {
    // emit leave msg to room + updateRoom to room
  });

  client.on("notReady", () => {
    users[client.id].isReady = false;
  });

  client.on("message", () => {
    // send to current room
  });

  client.on("ready", () => {
    // ready, check if 50%+ ready
    // emit starting to room
    // emit wordsUpdate after 5 sec
    // emit wordsUpdate every n sec
  });

  client.on("sendAnswer", () => {
    // update score,
    // emit sendAnswer to room,if currect don't show word
    // emit updateRoom to room
  });

  function joinRoom(client, roomId, callback) {
    let user = users[client.id];
    if (user.currentRoom) leaveRoom(client);
    if (!rooms[roomId]) return callback({ ...RESPONSES.INVALID_ROOMID });
    client.join(roomId);
    user.currentRoom = roomId;
    callback({ ...RESPONSES.JOINED_ROOM, data: { room: rooms[roomId] } });

    rooms[roomId].users.push(client.id);
    sendMessage(
      roomId,
      { id: 0, username: "System" },
      welcomeMsg(user.username)
    );
  }
  function leaveRoom() {}

  // UPDATE ROOM DATA WHEN USERNAME,CONFIG,READY,NOT-READY,ETC CHANGES
  function updateRoom(client) {
    let roomId = user[client.id].currentRoom;
    let newRoomData = rooms[roomId];
    newRoomData.users = newRoomData.users.map((userId) => users[userId]);
    io.to(roomId).emit("updateRoom", newRoomData);
  }

  function sendMessage(roomId, sender, content) {
    let message = {
      content: content,
      sender: {
        id: sender.id || 0,
        username: sender.username || "System",
      },
      timestamp: Date.now(),
    };
    io.to(roomId).emit("message", message);
  }
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
