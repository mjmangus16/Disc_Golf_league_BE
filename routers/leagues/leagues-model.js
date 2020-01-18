const db = require("../../data/dbConfig");

module.exports = {
  getLeagues,
  getLeagueById,
  createLeague,
  updateLeague,
  deleteLeague,
  getLeaguesByOwnerId,
  getLeaguesByUserId,
  getLeaguesByState
};

function getLeagues() {
  return db("leagues").select("*");
}

function getLeaguesByState(state) {
  return db("leagues").where({ state });
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

function updateLeague(league_id, changes) {
  return db("leagues")
    .where({ league_id })
    .update(changes, "*")
    .then(success => {
      if (success) {
        return getLeagueById(league_id).first();
      } else {
        return false;
      }
    });
}

async function deleteLeague(league_id) {
  await db("leagues")
    .where("league_id", league_id)
    .del();
  await db("members")
    .where("league_id", league_id)
    .del();
  const rounds = await db("rounds")
    .where("league_id", league_id)
    .map(round => round.round_id);

  await db("participants")
    .whereIn("round_id", rounds)
    .del();

  await db("rounds")
    .where("league_id", league_id)
    .del();
}

async function getLeaguesByOwnerId(owner_id) {
  const leagues = await db("leagues").where("owner_id", owner_id);
  const rounds = await db("rounds").select("*");
  const members = await db("members").select("*");

  const container = leagues.map(league => {
    return {
      league_id: league.league_id,
      name: league.name,
      type: league.type,
      state: league.state,
      zip: league.zip,
      location: league.location,
      days: league.days,
      active: league.active,
      rounds: rounds.filter(r => r.league_id == league.league_id).length,
      members: members.filter(m => m.league_id == league.league_id).length
    };
  });
  return container;
}

async function getLeaguesByUserId(user_id) {
  const ids = await db("members")
    .where("user_id", user_id)
    .map(m => m.league_id);

  return db("leagues").whereIn("league_id", ids);
}
