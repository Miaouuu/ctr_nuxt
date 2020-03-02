const Room = require("./Room");

const changeTeamName = (ele, socket) => {
  let index = Room.checkAdmin(ele.path, socket);
  if (index || index === 0)
    Room.ROOMS[index].changeTeamName(ele.path, ele.teamName, socket);
};

module.exports = { changeTeamName };
