exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rounds")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("rounds").insert([
        { round_id: 1, league_id: 0, date: "", round_num: 0, type: "" }
      ]);
    });
};
