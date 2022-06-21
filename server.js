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

rooms = [];

io.on("connection", (client) => {
  console.log("a new user connected");
  client.username = "Anonymous";

  client.on("updateProfile", ({ username }) => {
    client.username = username;
  });

  client.on("create", async (config, callback) => {
    let roomId = randomCode();
    rooms.push({ roomId, config, users: [] });
    callback({ ...RESPONSES.CREATED_ROOM, data: { roomId } });
  });

  client.on("getRoomData", ({ roomId }, callback) => {
    joinRoom(client, roomId, callback);
  });

  client.on("message", (data) => {
    if (!client.currentRoom) {
      return console.log("something went wrong, you are not in room");
    }

    let message = {
      content: data.content,
      sender: {
        id: client.id,
        username: client.username,
      },
      timestamp: Date.now(),
    };
    io.to(client.currentRoom).emit("message", message);
  });

  client.on("disconnect", () => {
    leaveRoom(client);
  });

  // ========================UTILS==============================
  // join room
  async function joinRoom(client, roomId, callback) {
    if (client.currentRoom) {
      leaveRoom(client);
    }
    const room = rooms.find((r) => r.roomId == roomId);
    if (room) {
      await client.join(roomId);
      client.currentRoom = roomId;
      callback({ ...RESPONSES.JOINED_ROOM, data: { room } });

      const user = {
        id: client.id,
        username: client.username,
      };
      room.users.push(user);
      io.to(roomId).emit("userJoin", user);
      const joinMsg = {
        content: welcomeMsg(client.username),
        sender: {
          id: 0,
          username: "System",
        },
        timestamp: Date.now(),
      };
      io.to(roomId).emit("message", joinMsg);
    } else {
      callback({ ...RESPONSES.INVALID_ROOMID });
    }
  }

  // leaveRoom
  function leaveRoom(client) {
    io.to(client.currentRoom).emit("userLeave", client.id);

    const leaveMsg = {
      content: `${client.username} just leaved the room.`,
      sender: {
        id: 0,
        username: "System",
      },
      timestamp: Date.now(),
    };
    io.to(client.currentRoom).emit("message", leaveMsg);

    client.leave(client.currentRoom);
    client.currentRoom = null;
    rooms.filter((room) => {
      room.users = room.users.filter((user) => user.id != client.id);
      if (room.users.length == 0) {
        return false;
      }
      return true;
    });
  }
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
