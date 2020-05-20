const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Controller = require("./draft/Controller");
const Room = require("./draft/Room");

io.on("connection", socket => {
  socket.emit("CHANGE_SOCKET_ID", socket.id);
  socket.on("CREATE_ROOM", ele => Room.createRoom(ele, socket));
  socket.on("JOIN_ROOM", ele => Room.joinRoom(ele, socket, io)); //DONNER TOUTES LES VARIABLES DE LA ROOM
  socket.on("CHECK_ROOM", ele => Room.checkRoom(ele, socket));
  socket.on("DISCONNECT_ROOM", ele => Room.disconnectRoom(ele, socket));
  socket.on("disconnect", ele => Room.disconnectRoom(ele, socket));

  socket.on("CHANGE_TEAM_A", ele => Controller.changeTeamA(ele, socket, io));
  socket.on("CHANGE_TEAM_B", ele => Controller.changeTeamB(ele, socket, io));
  socket.on("CHANGE_SPECTATOR", ele =>
    Controller.changeSpectator(ele, socket, io)
  );
  socket.on("CHANGE_TEAM_NAME", ele => Controller.changeTeamName(ele, socket));
  socket.on("CHANGE_DRAFT_MODE", ele =>
    Controller.changeDraftMode(ele, socket, io)
  );
  socket.on("NEXT_ROOM", ele => Controller.nextRoom(ele, socket, io));
  socket.on("START_DRAFT", ele => Controller.startDraft(ele, socket, io));

  socket.on("SELECT_MAP", ele => Controller.selectMap(ele, socket, io));
});

module.exports = {
  app,
  server,
  io
};
