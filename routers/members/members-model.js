const db = require("../../data/dbConfig");

module.exports = {
  getMembers,
  getMembersByLeagueId,
  addMemberToLeague,
  getMemberById,
  updateMember,
  deleteMember
};

function getMembers() {
  return db("members").select("*");
}

async function getMembersByLeagueId(league_id) {
  const members = await db("members").where("league_id", league_id);

  const rounds = await db("rounds")
    .where("league_id", league_id)
    .map(r => r.round_id);
  const participants = await db("participants").whereIn("round_id", rounds);

  container = members.map(m => {
    return {
      ...m,
      rounds: participants.filter(p => p.member_id == m.member_id)
    };
  });

  return container;
}

function getMemberById(member_id) {
  return db("members")
    .where("member_id", member_id)
    .first();
}

function addMemberToLeague(newMember, league_id) {
  return db("members")
    .insert({ ...newMember, league_id }, "member_id")
    .then(member => {
      const [id] = member;
      return getMemberById(id).first();
    });
}

function updateMember(member_id, changes) {
  return db("members")
    .where({ member_id })
    .update(changes, "*");
}

async function deleteMember(member_id) {
  await db("members")
    .where("member_id", member_id)
    .del();
  await db("participants")
    .where("member_id", member_id)
    .del();
}
