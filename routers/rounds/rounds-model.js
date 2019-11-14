const db = require("../../data/dbConfig");

module.exports = {
  getRounds,
  getRoundsByLeague
};

function getRounds() {
  return db("rounds").select("*");
}

function getRoundsByLeague(league_id) {
  return db("rounds").where("league_id", league_id);
}
