const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  getUserByEmail
};

function getUsers() {
  return db("users").select("*");
}

function getUserById(id) {
  return db("users")
    .where("user_id", id)
    .first();
}

function getUserByEmail(email) {
  return db("users")
    .where("email", email)
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
