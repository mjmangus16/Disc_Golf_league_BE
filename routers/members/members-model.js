const db = require("../../data/dbConfig");

module.exports = {
  getMembers,
  getMembersByLeagueId,
  addMemberToLeague
};

function getMembers() {
  return db("members").select("*");
}

function getMembersByLeagueId(league_id) {
  return db("members").where("league_id", league_id);
}

function getMemberById(member_id) {
  return db("members").where("member_id", member_id);
}

function addMemberToLeague(newMember) {
  return db("members")
    .insert(newMember, "member_id")
    .then(member => {
      const [id] = member;
      return getMemberById(id).first();
    });
}
