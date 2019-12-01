const db = require("../../data/dbConfig");

module.exports = {
  getParticipants,
  getParticipantsByLeagueAndMember,
  getParticipantsByRoundId
};

function getParticipants() {
  return db("participants").select("*");
}

async function getParticipantsByLeagueAndMember(member_id) {
  const rounds = await db("participants").join(
    "rounds",
    "participants.round_id",
    "=",
    "rounds.round_id"
  );
  return rounds.filter(r => r.member_id == member_id);
}

async function getParticipantsByRoundId(round_id) {
  const participants = await db("participants").join(
    "members",
    "members.member_id",
    "=",
    "participants.member_id"
  );
  return participants.filter(p => p.round_id == round_id);
}
