class Draft {
  constructor() {
    this.teamName = ["", ""];
    this.draftMode = {
      name: "Classic",
      bans: 6,
      picks: 10
    };
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

  changeDraftMode(pin, draftMode, socket) {
    if (draftMode === "Classic") {
      this.draftMode.name = "Classic";
      this.draftMode.bans = 6;
      this.draftMode.picks = 10;
    } else if (draftMode === "Light") {
      this.draftMode.name = "Light";
      this.draftMode.bans = 4;
      this.draftMode.picks = 6;
    } else if (draftMode === "League") {
      this.draftMode.name = "League";
      this.draftMode.bans = 6;
      this.draftMode.picks = 8;
    } else if (draftMode === "No") {
      this.draftMode.name = "No";
      this.draftMode.bans = 0;
      this.draftMode.picks = 10;
    } else {
      this.draftMode.name = "Classic";
      this.draftMode.bans = 6;
      this.draftMode.picks = 10;
    }
    socket.broadcast.to(pin).emit("RES_CHANGE_DRAFT_MODE", this.draftMode.name);
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
