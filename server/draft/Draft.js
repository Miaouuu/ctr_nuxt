class Draft {
  constructor() {
    this.teamName = ["", ""];
    this.started = false;
    this.timeLeft = 30;
  }

  changeTeamName(pin, newName, socket) {
    this.teamName[0] = newName[0];
    this.teamName[1] = newName[1];
    socket.broadcast
      .to(pin)
      .emit("RES_CHANGE_TEAM_NAME", [this.teamName[0], this.teamName[1]]);
  }

  startDraft(pin, io) {
    if (!this.started) {
      this.started = true;
      setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          io.to(pin).emit("RES_START_DRAFT", this.timeLeft);
        } else {
          this.timeLeft = 30;
          io.to(pin).emit("RES_START_DRAFT", this.timeLeft);
        }
      }, 1000);
    }
  }
}

module.exports = Draft;
