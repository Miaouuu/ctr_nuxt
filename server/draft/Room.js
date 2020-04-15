const Draft = require("./Draft");

class Room extends Draft {
  static ROOMS = [];
  static PIN_LENGTH = 4;

  constructor(pin, admin) {
    super();
    this.pin = pin;
    this.admin = admin;
    this.users = ["", ""];
    this.spectators = [];
  }

  static checkAdmin(ele, socket) {
    let index = this.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
    if (index === -1) return false;
    return this.ROOMS[index].admin === socket.id ? index : false;
  }

  static checkUsers(ele, socket) {
    let indexRoom = this.ROOMS.findIndex(
      data => data.pin === ele.toUpperCase()
    );
    if (indexRoom === -1) return { room: false, user: false };
    let indexUser = this.ROOMS[indexRoom].users.indexOf(socket.id);
    return indexUser !== -1
      ? { room: indexRoom, user: indexUser }
      : { room: false, user: false };
  }

  static newPin() {
    const characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    let result = "";
    for (let i = 0; i < this.PIN_LENGTH; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    while (this.ROOMS.findIndex(data => data.pin === result) !== -1) {
      result = "";
      for (let i = 0; i < this.PIN_LENGTH; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    }
    return result;
  }

  static createRoom(ele, socket) {
    let pin = this.newPin();
    let actualRoom = new Room(pin, socket.id);
    this.ROOMS.push(actualRoom);
    socket.emit("RES_CREATE_ROOM", actualRoom);
    return pin;
  }

  static joinRoom(ele, socket, io) {
    socket.join(ele.toUpperCase());
    let index = this.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
    this.ROOMS[index].addUser(0, socket, io);
    socket.emit("RES_JOIN_ROOM", [
      this.ROOMS[index].draftMode,
      this.ROOMS[index].maps
    ]);
  }

  static checkRoom(ele, socket) {
    let index = this.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
    if (index === -1) {
      socket.emit("RES_CHECK_ROOM", { exist: false });
    } else {
      if (this.ROOMS[index].admin === socket.id) {
        socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: true });
      } else {
        socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: false });
      }
    }
  }

  static disconnectRoom(ele, socket) {
    let index = -1;
    this.ROOMS.map(ele => {
      let temp = ele.users.indexOf(socket.id);
      if (temp !== -1) {
        index = temp;
      }
    });
    let indexRoom = this.ROOMS.findIndex(ele => ele.users[index] === socket.id);
    if (index !== -1) {
      this.ROOMS[indexRoom].users.splice(index, 1, "");
    } else {
      this.ROOMS.map(ele => {
        let temp = ele.spectators.indexOf(socket.id);
        if (temp !== -1) {
          index = temp;
        }
      });
      indexRoom = this.ROOMS.findIndex(
        ele => ele.spectators[index] === socket.id
      );
      if (index !== -1) {
        this.ROOMS[indexRoom].spectators.splice(index, 1);
      }
    }
    if (indexRoom !== -1) {
      socket.leave(this.ROOMS[indexRoom].pin.toUpperCase());
    }
  }

  sendStart(io) {
    this.state = 2;
    this.users.map(ele => {
      io.to(ele).emit("RES_START_DRAFT", this.state);
    });
    this.spectators.map(ele => {
      io.to(ele).emit("RES_START_DRAFT", 3);
    });
  }

  nextRoom(ele, io) {
    this.state = 1;
    io.to(ele.toUpperCase()).emit("RES_NEXT_ROOM", this.state);
  }

  addUser(teamJoin, socket, io) {
    switch (teamJoin) {
      case 0:
        if (this.users[0] === "") {
          this.users[0] = socket.id;
          socket.emit("RES_CHANGE_TEAM", "TEAM A");
          io.to(this.pin.toUpperCase()).emit("RES_CHANGE", [
            this.users[0] === "" ? false : true,
            this.users[1] === "" ? false : true
          ]);
        } else {
          this.addSpectators(socket, io);
        }
        break;
      case 1:
        if (this.users[1] === "") {
          this.users[1] = socket.id;
          socket.emit("RES_CHANGE_TEAM", "TEAM B");
          io.to(this.pin.toUpperCase()).emit("RES_CHANGE", [
            this.users[0] === "" ? false : true,
            this.users[1] === "" ? false : true
          ]);
        } else {
          this.addSpectators(socket, io);
        }
        break;
    }
    console.log(this.users);
    console.log(this.spectators);
  }

  addSpectators(socket, io) {
    this.spectators.push(socket.id);
    socket.emit("RES_CHANGE_TEAM", "SPECTATOR");
    io.to(this.pin.toUpperCase()).emit("RES_CHANGE", [
      this.users[0] === "" ? false : true,
      this.users[1] === "" ? false : true
    ]);
    console.log(this.users);
    console.log(this.spectators);
  }

  deleteUser(user) {
    let whereIs = this.users.indexOf(user);
    if (whereIs !== -1) {
      this.users.splice(whereIs, 1, "");
    } else {
      whereIs = this.spectators.indexOf(user);
      if (whereIs !== -1) {
        this.spectators.splice(whereIs, 1);
      }
    }
  }
}

module.exports = Room;
