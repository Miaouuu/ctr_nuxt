const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Controller = require("./draft/Controller");
const Room = require("./draft/Room");

io.on("connection", socket => {
  socket.on("CREATE_ROOM", ele => Room.createRoom(ele, socket));
  socket.on("JOIN_ROOM", ele => Room.joinRoom(ele, socket));
  socket.on("CHECK_ROOM", ele => Room.checkRoom(ele, socket));
  socket.on("DISCONNECT_ROOM", ele => Room.disconnectRoom(ele, socket)); //DISCONNECT SOCKET IO AUSSi avec leave
  socket.on("disconnect", ele => Room.disconnectRoom(ele, socket));
  // socket.on("DELETE_ROOM"); CHECK SI ADMIN EST DANS USER

  socket.on("CHANGE_TEAM_NAME", ele => Controller.changeTeamName(ele, socket));
  socket.on("STRAT_DRAFT", ele => Controller.startDraft(ele, socket));
});

module.exports = {
  app,
  server
};
