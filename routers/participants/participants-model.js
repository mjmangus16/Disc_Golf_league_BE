const db = require("../../data/dbConfig");

module.exports = {
  getParticipants
};

function getParticipants() {
  return db("participants").select("*");
}
