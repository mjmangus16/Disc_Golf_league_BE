const db = require("../../data/dbConfig");

module.exports = {
  getMembers,
  getMembersByLeagueId
};

function getMembers() {
  return db("members").select("*");
}

function getMembersByLeagueId(league_id) {
  return db("members").where("league_id", league_id);
}
