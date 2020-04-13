const Room = require("./Room");

const changeTeamA = (ele, socket) => {
  let indexRoom = Room.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
  //NEED CHECK POUR PAS SUPPR POUR R
  Room.ROOMS[indexRoom].deleteUser(socket.id);
  Room.ROOMS[indexRoom].addUser(0, socket);
};

const changeTeamB = (ele, socket) => {
  let indexRoom = Room.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
  //NEED CHECK POUR PAS SUPPR POUR R
  Room.ROOMS[indexRoom].deleteUser(socket.id);
  Room.ROOMS[indexRoom].addUser(1, socket);
};

const changeSpectator = (ele, socket) => {
  let indexRoom = Room.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
  //NEED CHECK POUR PAS SUPPR POUR R
  Room.ROOMS[indexRoom].deleteUser(socket.id);
  Room.ROOMS[indexRoom].addSpectators(socket);
};

const changeTeamName = (ele, socket) => {
  let index = Room.checkAdmin(ele.path, socket);
  if (index || index === 0)
    Room.ROOMS[index].changeTeamName(ele.path, ele.teamName, socket);
};

const changeDraftMode = (ele, socket, io) => {
  let index = Room.checkAdmin(ele.path, socket);
  if (index || index === 0)
    Room.ROOMS[index].changeDraftMode(ele.path, ele.value, io);
};

const nextRoom = (ele, socket, io) => {
  let index = Room.checkAdmin(ele, socket);
  if (index || index === 0) Room.ROOMS[index].nextRoom(ele, io);
};

const startDraft = (ele, socket, io) => {
  let index = Room.checkAdmin(ele, socket);
  if (index || index === 0) Room.ROOMS[index].startDraft(ele, io);
};

const selectMap = (ele, socket, io) => {
  let index = Room.checkUsers(ele.path, socket);
  if (index.room || index.room === 0) {
    Room.ROOMS[index.room].selectMap(ele.path, io, ele.id, index.user);
  }
};
module.exports = {
  changeTeamA,
  changeTeamB,
  changeSpectator,
  changeTeamName,
  changeDraftMode,
  nextRoom,
  startDraft,
  selectMap
};
