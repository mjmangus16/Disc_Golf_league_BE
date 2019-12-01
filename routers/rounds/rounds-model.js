const db = require("../../data/dbConfig");

module.exports = {
  getRounds,
  getRoundById,
  getRoundsByLeague,
  addRound,
  updateRound,
  deleteRound
};

function getRounds() {
  return db("rounds").select("*");
}

function getRoundById(round_id) {
  return db("rounds")
    .where("round_id", round_id)
    .first();
}

function getRoundsByLeague(league_id) {
  return db("rounds").where("league_id", league_id);
}

async function addRound(newRound, league_id) {
  const rounds = await getRoundsByLeague(league_id);
  const filtered = await rounds.filter(r => r.type === newRound.type);

  return db("rounds")
    .insert(
      { ...newRound, league_id, round_num: filtered.length + 1 },
      "round_id"
    )
    .then(round => {
      const [id] = round;
      return getRoundById(id);
    });
}

function updateRound(round_id, changes) {
  return db("rounds")
    .where({ round_id })
    .update(changes, "*")
    .then(success => {
      if (success) {
        return getRoundById(round_id);
      } else {
        return false;
      }
    });
}

async function deleteRound(round_id) {
  await db("rounds")
    .where("round_id", round_id)
    .del();
  await db("participants")
    .where("round_id", round_id)
    .del();
}
