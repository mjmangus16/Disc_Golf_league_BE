const db = require("../../data/dbConfig");

module.exports = {
  getParticipants,
  getParticipantById,
  getParticipantsByLeagueAndMember,
  getParticipantsByRoundId,
  addParticipants,
  updateParticipant,
  deleteParticipant
};

function getParticipants() {
  return db("participants").select("*");
}

function getParticipantById(participant_id) {
  return db("participants")
    .where({ participant_id })
    .first();
}

async function getParticipantsByLeagueAndMember(member_id) {
  const rounds = await db("participants").join(
    "rounds",
    "participants.round_id",
    "=",
    "rounds.round_id"
  );
  const container = rounds.filter(r => r.member_id == member_id);

  return container.map(c => {
    return {
      participant_id: c.participant_id,
      date: c.date,
      type: c.type,
      location: c.location,
      score: c.score
    };
  });
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

function addParticipants(round_id, participants) {
  participants = participants.map(p => {
    return { round_id, member_id: p.member_id, score: p.score };
  });

  return db("participants").insert(participants);
}

function updateParticipant(participant_id, changes) {
  return db("participants")
    .where({ participant_id })
    .update(changes, "*")
    .then(success => {
      if (success) {
        return getParticipantById(participant_id);
      } else {
        return false;
      }
    });
}

function deleteParticipant(participant_id) {
  return db("participants")
    .where({ participant_id })
    .del();
}
