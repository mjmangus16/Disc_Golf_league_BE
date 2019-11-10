const db = require("../../data/dbConfig");

module.exports = {
  getRounds
};

function getRounds() {
  return db("rounds").select("*");
}
