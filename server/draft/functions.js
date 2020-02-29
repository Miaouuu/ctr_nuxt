const checkAdmin = (roomAdmin, id) => (roomAdmin === id ? true : false);
const newPin = (resultLength, rooms) => {
  const characters = "AB";
  let result = "";
  for (let i = 0; i < resultLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  while (rooms.findIndex(data => data.pin === result) !== -1) {
    result = "";
    for (let i = 0; i < resultLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  }
  return result;
};

module.exports = { checkAdmin, newPin };
