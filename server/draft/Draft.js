class Draft {
  constructor() {
    this.teamName = ["", ""];
    this.draftMode = {
      name: "Classic",
      bans: 6,
      picks: 10
    };
    this.orderPick = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
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

  changeDraftMode(pin, draftMode, io) {
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
    io.to(pin.toUpperCase()).emit("RES_CHANGE_DRAFT_MODE", this.draftMode);
  }

  startTimer(pin, io) {
    this.timeLeft = 30;
    this.timer = setInterval(() => {
      io.to(pin.toUpperCase()).emit("RES_START_TIMER", this.timeLeft);
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
      this.startTimer(pin, io);
    }
  }

  nextRound(pin, io, idMap, indexUser) {
    if (this.round <= this.draftMode.bans) {
      if (indexUser == this.turn) {
        clearInterval(this.timer);
        this.maps.banned.push(idMap);
        this.startTimer(pin, io);
        this.turn = !this.turn;
        this.round++;
        io.to(pin.toUpperCase()).emit("RES_NEXT_ROUND", {
          banOrPick: 0,
          idMap: idMap,
          round: this.round,
          turn: this.turn,
          maps: this.maps
        });
      }
    } else if (
      this.round > this.draftMode.bans &&
      this.round <= this.draftMode.picks + this.draftMode.bans
    ) {
      if (this.orderPick[this.round - this.draftMode.bans - 1] == indexUser) {
        clearInterval(this.timer);
        this.maps.picked.push(idMap);
        this.startTimer(pin, io);
        this.round++;
        io.to(pin.toUpperCase()).emit("RES_NEXT_ROUND", {
          banOrPick: 1,
          idMap: idMap,
          round: this.round,
          turn: this.turn,
          maps: this.maps
        });
        if (this.round > this.draftMode.picks + this.draftMode.bans) {
          io.to(pin.toUpperCase()).emit("RES_END_GAME", (this.state = 3));
        }

        console.log(this.maps, this.round);
      }
    }
  }

  selectMap(pin, io, idMap, indexUser) {
    if (
      this.maps.banned.indexOf(idMap) === -1 &&
      this.maps.picked.indexOf(idMap) === -1
    ) {
      this.nextRound(pin, io, idMap, indexUser);
    }
  }
}

module.exports = Draft;
