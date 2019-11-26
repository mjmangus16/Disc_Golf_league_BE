const db = require("../../data/dbConfig");

module.exports = {
  getParticipants,
  getParticipantsByLeagueAndMember
};

function getParticipants() {
  return db("participants").select("*");
}

async function getParticipantsByLeagueAndMember(league_id, member_id) {
  const rounds = await db("rounds")
    .where("league_id", league_id)
    .map(r => r.round_id);
  const members = await db("participants").whereIn("round_id", rounds);

  return members.filter(m => m.member_id == member_id);
}
