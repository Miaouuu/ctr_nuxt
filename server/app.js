const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Room = require("./draft/Room");

let pinRoom = 1;
let room = [];

io.on("connection", socket => {
  socket.on("CREATE_ROOM", ele => {
    let actualRoom = new Room(pinRoom, socket.id);
    room.push(actualRoom);
    socket.emit("RES_CREATE_ROOM", actualRoom);
    pinRoom++;
  });
  socket.on("JOIN_ROOM", ele => {
    socket.join(ele);
    let index = room.findIndex(data => data.pin == ele);
    if (room[index].users.length < 2) {
      room[index].addUser(socket.id);
    } else {
      room[index].addSpectators(socket.id);
    }
  });
  socket.on("CHECK_ROOM", ele => {
    if (room.findIndex(data => data.pin == ele) === -1) {
      socket.emit("RES_CHECK_ROOM", false);
    } else {
      socket.emit("RES_CHECK_ROOM", true);
    }
  });
  // socket.on("DISCONNECT_ROOM");
  // socket.on("DELETE_ROOM");
});

module.exports = {
  app,
  server
};
