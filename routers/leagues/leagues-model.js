const db = require("../../data/dbConfig");

module.exports = {
  getLeagues
};

function getLeagues() {
  return db("leagues").select("*");
}
