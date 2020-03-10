class Draft {
  constructor() {
    this.teamName = ["", ""];
    this.draftMode = {
      name: "Classic",
      bans: 6,
      picks: 10
    };
    this.round = 1;
    this.started = false;
    this.state = 0;
    this.turn = false;
    this.maps = {
      banned: [],
      picked: []
    };
    this.timer = null;
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

  startTimer(pin, io) {
    this.timeLeft = 5;
    this.timer = setInterval(() => {
      io.to(pin).emit("RES_START_TIMER", this.timeLeft);
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextRound(pin, io, -1, this.turn);
      }
    }, 1000);
  }

  startDraft(pin, io) {
    if (!this.started) {
      this.started = true;
      io.to(pin).emit("RES_START_DRAFT", (this.state = 1));
      this.startTimer(pin, io);
    }
  }

  nextRound(pin, io, idMap, indexUser) {
    if (indexUser == this.turn) {
      clearInterval(this.timer);
      if (this.round <= this.draftMode.bans) {
        this.maps.banned.push(idMap);
        this.startTimer(pin, io);
        this.turn = !this.turn;
        this.round++;
        io.to(pin).emit("RES_NEXT_ROUND", [0, idMap]);
      } else if (
        this.round > this.draftMode.bans &&
        this.round <= this.draftMode.picks + this.draftMode.bans
      ) {
        this.maps.picked.push(idMap);
        this.startTimer(pin, io);
        this.turn = !this.turn;
        this.round++;
        io.to(pin).emit("RES_NEXT_ROUND", [1, idMap]);
      } else {
        console.log("GAME END");
      }
      console.log(this.maps, this.round);
    }
  }

  selectMap(pin, io, idMap, indexUser) {
    //CHECK MAP
    this.nextRound(pin, io, idMap, indexUser);
  }
}

module.exports = Draft;
