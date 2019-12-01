const db = require("../../data/dbConfig");

module.exports = {
  getParticipants,
  getParticipantsByLeagueAndMember,
  getParticipantsByRoundId,
  updateParticipant,
  deleteParticipant
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
  return participants
    .filter(p => p.round_id == round_id)
    .map(p => {
      return {
        f_name: p.f_name,
        l_name: p.l_name,
        score: p.score,
        participant_id: p.participant_id
      };
    });
}

function updateParticipant(participant_id, changes) {
  db("participants")
    .where({ participant_id })
    .update(changes, "*");
}

function deleteParticipant(participant_id) {
  db("participants")
    .where("participant_id", participant_id)
    .del();
}
