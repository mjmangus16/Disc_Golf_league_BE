const db = require("../../data/dbConfig");

module.exports = {
  getFormats,
  getStandingsById,
  getLeagueStandings,
  getLeagueStandingsById,
  addLeagueStandings,
  updateLeagueStandings,
  deleteLeagueStandings,
  addStandingsFormat,
  updateStandingsFormat,
  deleteStandingsFormat
};

function getFormats() {
  return db("standings_format").select("*");
}

function getStandingsById(standings_format_id) {
  return db("standings_format")
    .where("standings_format_id", standings_format_id)
    .first();
}

function getLeagueStandings() {
  return db("standings").join(
    "standings_format",
    "standings.standings_format_id",
    "=",
    "standings_format.standings_format_id"
  );
}

function getLeagueStandingsById(league_id) {
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

async function addLeagueStandings(league_id, standings_format_id) {
  await db("standings").insert(
    { league_id, standings_format_id },
    "standings_id"
  );

  return getLeagueStandingsById(league_id);
}

async function updateLeagueStandings(league_id, standings_format_id) {
  let old = await getLeagueStandingsById(league_id);
  await db("standings")
    .where("standings_id", old.standings_id)
    .update("standings_format_id", standings_format_id);

  return getLeagueStandingsById(league_id);
}

function deleteLeagueStandings(standings_id) {
  return db("standings")
    .where("standings_id", standings_id)
    .del();
}

function addStandingsFormat(new_format) {
  return db("standings_format").insert(new_format, "standings_format_id");
}

async function updateStandingsFormat(standings_format_id, update) {
  await db("standings_format")
    .where("standings_format_id", standings_format_id)
    .update(update);

  return getStandingsById(standings_format_id);
}

function deleteStandingsFormat(standings_format_id) {
  return db("standings_format")
    .where("standings_format_id", standings_format_id)
    .del();
}
