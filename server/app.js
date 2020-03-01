const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Room = require("./draft/Room");

io.on("connection", socket => {
  socket.on("CREATE_ROOM", ele => Room.createRoom(ele, socket));
  socket.on("JOIN_ROOM", ele => Room.joinRoom(ele, socket));
  socket.on("CHECK_ROOM", ele => Room.checkRoom(ele, socket));
  // socket.on("DISCONNECT_ROOM");
  // socket.on("DELETE_ROOM");
});

module.exports = {
  app,
  server
};
