class Draft {
  constructor() {
    this.teamName = ["", ""];
  }

  changeTeamName(pin, newName, socket) {
    this.teamName[0] = newName[0];
    this.teamName[1] = newName[1];
    socket.broadcast
      .to(pin)
      .emit("RES_CHANGE_TEAM_NAME", [this.teamName[0], this.teamName[1]]);
  }

  startDraft(pin, socket){
    
  }
}

module.exports = Draft;
