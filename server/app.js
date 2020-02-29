const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const controller = require("./draft/Controller");

const ROOMS = [];

io.on("connection", socket => {
  socket.on("CREATE_ROOM", ele => controller.createRoom(ele, socket, ROOMS));
  socket.on("JOIN_ROOM", ele => controller.joinRoom(ele, socket, ROOMS));
  socket.on("CHECK_ROOM", ele => controller.checkRoom(ele, socket, ROOMS));
  // socket.on("DISCONNECT_ROOM");
  // socket.on("DELETE_ROOM");
});

module.exports = {
  app,
  server
};
