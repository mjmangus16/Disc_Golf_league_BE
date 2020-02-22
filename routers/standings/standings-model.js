const db = require("../../data/dbConfig");

module.exports = {
  getStandings,
  getStandingsByLeagueId
};

function getStandings() {
  return db("standings").select("*");
}

function getStandingsByLeagueId(league_id) {
  return db("standings")
    .where("league_id", league_id)
    .first();
}
