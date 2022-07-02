const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const { getWordRegex, checkValidWord } = require("./utils/dictionary");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const randomCode = require("./utils/genrateCode");
const RESPONSES = require("./utils/RESPONSES");
const welcomeMsg = require("./utils/welcomeMsg");
// const dictionary = require("./dictionary/words_dictionary.json");
// console.log(dictionary["heallo"]);

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

rooms = {};
users = {};
online = [];
io.on("connection", (client) => {
  console.log("new user connected");
  users[client.id] = {
    id: client.id,
    username: "Anonymous",
    currentRoom: null,
    score: 0,
    isReady: false,
    answers: [],
  };

  // CREATE BRAND NEW EMPTY ROOM
  client.on("create", (config, callback) => {
    let id = randomCode();
    rooms[id] = {
      id,
      config,
      owner: client.id,
      readyCount: 0,
      userCount: 0,
      isRunning: false,
      currentWord: null,
      users: [],
    };
    callback({ ...RESPONSES.CREATED_ROOM, data: { id } });
  });

  // UPDATE PROFILE (HERE USERNAME ONLY)
  client.on("updateProfile", ({ username }) => {
    users[client.id].username = username;
    if (rooms[users[client.id].currentRoom])
      updateRoom(users[client.id].currentRoom);
  });

  // JOIN CLIENT TO PERTICULAR ROOM
  client.on("join", (roomid, callback) => {
    joinRoom(client, roomid, callback);
  });

  client.on("disconnect", () => {
    leaveRoom(client);
    delete users[client.id];
  });

  client.on("notReady", () => {
    users[client.id].isReady = false;
    updateRoom(users[client.id].currentRoom);
  });

  client.on("message", ({ content }) => {
    sendMessage(
      rooms[users[client.id].currentRoom].id,
      users[client.id],
      content
    );
  });

  client.on("ready", () => {
    let user = users[client.id];
    users[client.id].isReady = true;

    let totalReady = 0,
      totalNotReady = 0;
    rooms[user.currentRoom].users.forEach((userId) => {
      users[userId].isReady ? totalReady++ : totalNotReady++;
    });

    // main game
    if (totalReady > totalNotReady && totalReady > 1) {
      let room = rooms[user.currentRoom];
      room.isRunning = true;
      updateRoom(room.id);
      io.to(room.id).emit("starting");

      setTimeout(() => {
        dothings();
      }, 5000);

      let { round, timer } = room.config;
      let currentRound = 0;
      function dothings() {
        currentRound++;
        if (currentRound > round) {
          resetRoom(room.id);
          updateRoom(room.id);
          return console.log("completed game");
        }
        room.currentWord = getWordRegex();
        updateRoom(room.id);
        setTimeout(() => {
          dothings();
        }, timer * 1000);
      }
    } else {
      updateRoom(user.currentRoom);
    }
  });

  client.on("answer", (answer, callback) => {
    let user = users[client.id];
    let room = rooms[user.currentRoom];
    if (!room) return console.log("answer without room");
    console.log(answer, user.answers);
    if (user.answers.includes(answer)) {
      updateRoom();
      return callback(RESPONSES.ALREADY_ANSWERED);
    }
    let isValid = checkValidWord(room.currentWord, answer);
    if (isValid) {
      user.score += 5;
      user.answers.push(answer);
      callback(RESPONSES.RIGHT_ANSWER);
      updateRoom(room.id);
    } else {
      callback(RESPONSES.WRONG_ANSWER);
    }
  });

  //================================== UTILS ==========================================
  // WHEN USER JOINS ROOM
  function joinRoom(client, roomId, callback) {
    let user = users[client.id];
    if (user.currentRoom) leaveRoom(client);
    if (!rooms[roomId]) return callback({ ...RESPONSES.INVALID_ROOMID });
    client.join(roomId);
    users[client.id].currentRoom = roomId;
    callback({ ...RESPONSES.JOINED_ROOM });

    rooms[roomId].users.push(client.id);
    sendMessage(roomId, null, welcomeMsg(user.username));
    updateRoom(roomId);
  }

  // WHEN USER LEAVE A ROOM OR DISSCONNECT
  function leaveRoom(client) {
    let roomId = users[client.id].currentRoom;
    if (!roomId) return;
    sendMessage(
      roomId,
      null,
      `${users[client.id].username} just leaved the room.`
    );
    client.leave(roomId);
    rooms[roomId].users = rooms[roomId].users.filter(
      (userId) => userId != client.id
    );
    users[client.id].currentRoom = null;
    updateRoom(roomId);
  }

  // UPDATE ROOM DATA WHEN USERNAME,CONFIG,READY,NOT-READY,ETC CHANGES
  function updateRoom(roomId) {
    if (!roomId) return;
    let dataResponse = { ...rooms[roomId] };
    dataResponse.users = dataResponse.users.map((userId) => users[userId]);
    io.to(roomId).emit("updateRoom", dataResponse);
  }

  // SEND MESSAGE INCLUDING WELCOME AND LEAVE MESSAGE
  function sendMessage(roomId, sender, content) {
    if (!sender) sender = { id: 0, username: "System" };
    let message = {
      content: content,
      sender: {
        id: sender.id,
        username: sender.username,
      },
      timestamp: Date.now(),
    };
    io.to(roomId).emit("message", message);
  }

  function resetRoom(roomId) {
    rooms[roomId].isRunning = false;
    rooms[roomId].users.forEach((userId) => {
      users[userId].isReady = false;
      users[userId].score = 0;
      users[userId].answers = [];
    });
  }
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
