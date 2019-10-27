const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  getUserByUsername
};

function getUsers() {
  return db("users").select("*");
}

function getUserById(id) {
  return db("users")
    .where("user_id", id)
    .first();
}

function getUserByUsername(username) {
  return db("users")
    .where("username", username)
    .first();
}

function addUser(newUser) {
  return db("users")
    .insert(newUser, "user_id")
    .then(user => {
      const [id] = user;
      return getUserById(id).first();
    });
}

function deleteUser(id) {
  return db("users")
    .where("user_id", id)
    .del();
}
