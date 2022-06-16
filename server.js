const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const randomCode = require("./utils/genrateCode");
const RESPONSES = require("./utils/RESPONSES");

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

rooms = [];

io.on("connection", (client) => {
  client.on("join", async (roomId, callback) => {
    if (rooms.includes(roomId)) {
      await client.join(roomId);
      callback({ ...RESPONSES.JOINED_ROOM, data: { roomId } });
    } else {
      callback({ ...RESPONSES.INVALID_ROOMID, data: { roomId } });
    }
  });

  client.on("create", async (callback) => {
    let roomId = randomCode();
    await client.join(roomId);
    rooms.push(roomId);
    callback({ ...RESPONSES.JOINED_ROOM, data: { roomId } });
  });

  client.on("get-room-data", (roomId, callback) => {
    // to do get data
  });

  console.log("a new user connected");
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
