class Room {
  static ROOMS = [];
  static PIN_LENGTH = 4;

  constructor(pin, admin) {
    this.pin = pin;
    this.admin = admin;
    this.users = [];
    this.spectators = [];
  }

  static checkAdmin(roomAdmin, id) {
    return roomAdmin === id ? true : false;
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
  }

  static joinRoom(ele, socket) {
    socket.join(ele);
    let index = this.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
    if (this.ROOMS[index].users.length < 2) {
      this.ROOMS[index].addUser(socket.id);
    } else {
      this.ROOMS[index].addSpectators(socket.id);
    }
  }

  static checkRoom(ele, socket) {
    let index = this.ROOMS.findIndex(data => data.pin === ele.toUpperCase());
    if (index === -1) {
      socket.emit("RES_CHECK_ROOM", { exist: false });
    } else {
      if (this.checkAdmin(this.ROOMS[index].admin, socket.id)) {
        socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: true });
      } else {
        socket.emit("RES_CHECK_ROOM", { exist: true, isAdmin: false });
      }
    }
  }

  addUser(user) {
    this.users.push(user);
  }

  addSpectators(user) {
    this.spectators.push(user);
  }
}

module.exports = Room;
