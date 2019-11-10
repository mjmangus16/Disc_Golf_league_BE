const db = require("../../data/dbConfig");

module.exports = {
  getMembers
};

function getMembers() {
  return db("members").select("*");
}
