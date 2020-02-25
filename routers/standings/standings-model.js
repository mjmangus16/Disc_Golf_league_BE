const db = require("../../data/dbConfig");

module.exports = {
  getStandings,
  getStandingsByLeagueId
};

function getStandings() {
  return db("standings").join(
    "standings_format",
    "standings.standings_format_id",
    "=",
    "standings_format.standings_format_id"
  );
}

function getStandingsByLeagueId(league_id) {
  return db("standings")
    .join(
      "standings_format",
      "standings.standings_format_id",
      "=",
      "standings_format.standings_format_id"
    )
    .where("league_id", league_id)
    .first();
}
