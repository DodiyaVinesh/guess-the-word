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
  client.on("create", async (config, callback) => {
    console.log("myon", config);
    let roomId = randomCode();
    await client.join(roomId);
    rooms.push({ roomId, config });
    callback({ ...RESPONSES.JOINED_ROOM, data: { roomId } });
  });

  client.on("getRoomData", async (roomId, callback) => {
    console.log(client.rooms);
    const room = rooms.find((r) => r.roomId == roomId);
    console.log(room);
    if (room) {
      await client.join(roomId);
      callback({ ...RESPONSES.JOINED_ROOM, data: { room } });
    } else {
      callback({ ...RESPONSES.INVALID_ROOMID });
    }
  });

  client.on("disconnect", (client) => {
    console.log(io.sockets.length);
    console.log("==========");
    console.log(client);
  });

  console.log("a new user connected");
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
