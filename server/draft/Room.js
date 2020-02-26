class Room {
  constructor(pin, admin) {
    this.pin = pin;
    this.admin = admin;
    this.users = [];
    this.spectators = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addSpectators(user) {
    this.spectators.push(user);
  }
}

module.exports = Room;
