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
      rounds: participants.filter(p => p.member_id == m.member_id).length
    };
  });

  return container;
}

async function getMemberById(member_id) {
  const member = await db("members")
    .where("member_id", member_id)
    .first();

  const user = await db("users")
    .where("user_id", member.user_id)
    .first();

  return {
    f_name: member.f_name,
    l_name: member.l_name,
    member_id: member.member_id,
    league_id: member.league_id,
    user_id: user ? user.user_id : null,
    email: user ? user.email : null
  };
}

function addMemberToLeague(newMember, league_id) {
  return db("members")
    .insert({ ...newMember, league_id }, "member_id")
    .then(member => {
      console.log(member);
      const [id] = member;
      return getMemberById(id);
    });
}

function updateMember(member_id, changes) {
  return db("members")
    .where({ member_id })
    .update(changes, "*")
    .then(success => {
      if (success) {
        return getMemberById(member_id);
      } else {
        return false;
      }
    });
}

async function deleteMember(member_id) {
  await db("members")
    .where("member_id", member_id)
    .del();
  await db("participants")
    .where("member_id", member_id)
    .del();
}
