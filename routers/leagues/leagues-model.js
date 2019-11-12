const db = require("../../data/dbConfig");

module.exports = {
  getLeagues,
  getLeagueById,
  createLeague
};

function getLeagues() {
  return db("leagues").select("*");
}

function getLeagueById(league_id) {
  return db("leagues")
    .where({ league_id })
    .first();
}

function createLeague(newLeague) {
  return db("leagues")
    .insert(newLeague, "league_id")
    .then(league => {
      const [id] = league;
      return getLeagueById(id).first();
    });
}
