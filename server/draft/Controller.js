const PIN_LENGTH = 2;
const Room = require("./Room");
const { checkAdmin, newPin } = require("./functions");

const createRoom = (ele, socket, rooms) => {
  let pin = newPin(PIN_LENGTH, rooms);
  let actualRoom = new Room(pin, socket.id);
  rooms.push(actualRoom);
  socket.emit("RES_CREATE_ROOM", actualRoom);
};
const joinRoom = (ele, socket, rooms) => {
  socket.join(ele);
  let index = rooms.findIndex(data => data.pin === ele.toUpperCase());
  if (rooms[index].users.length < 2) {
    rooms[index].addUser(socket.id);
  } else {
    rooms[index].addSpectators(socket.id);
  }
};
const checkRoom = (ele, socket, rooms) => {
  let index = rooms.findIndex(data => data.pin === ele.toUpperCase());
  if (index === -1) {
    socket.emit("RES_CHECK_ROOM", { exist: false });
  } else {
    if (checkAdmin(rooms[index].admin, socket.id)) {
      socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: true });
    } else {
      socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: false });
    }
  }
};

module.exports = { createRoom, joinRoom, checkRoom };
