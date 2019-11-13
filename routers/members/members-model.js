const db = require("../../data/dbConfig");

module.exports = {
  getMembers,
  getMembersByLeagueId,
  addMemberToLeague,
  connectMemberToUser
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

async function connectMemberToUser(member_id, user_email) {
  const user = await db("users")
    .where("email", user_email)
    .first();

  if (!user) {
    return { status: 500, error: "That email does not exist in our database." };
  }

  const member = await db("members")
    .where("member_id", member_id)
    .first();

  if (!member) {
    return {
      status: 500,
      error: "That member does not exist in our database."
    };
  }

  const changes = { ...member, user_id: user.user_id };

  return db("members")
    .where("member_id", member_id)
    .update(changes, "*")
    .then(success => {
      if (success) {
        return {
          status: 200,
          message: "That member was successfully connected to the user account."
        };
      } else {
        return {
          status: 500,
          error: "That member could not be connected to the user account."
        };
      }
    });
}
