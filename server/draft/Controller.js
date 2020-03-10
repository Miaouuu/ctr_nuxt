const Room = require("./Room");

const changeTeamName = (ele, socket) => {
  let index = Room.checkAdmin(ele.path, socket);
  if (index || index === 0)
    Room.ROOMS[index].changeTeamName(ele.path, ele.teamName, socket);
};

const changeDraftMode = (ele, socket) => {
  let index = Room.checkAdmin(ele.path, socket);
  if (index || index === 0)
    Room.ROOMS[index].changeDraftMode(ele.path, ele.value, socket);
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
module.exports = { changeTeamName, changeDraftMode, startDraft, selectMap };
