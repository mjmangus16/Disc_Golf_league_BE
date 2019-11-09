exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("participants")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("participants").insert([
        { participant_id: 1, member_id: 0, round_id: 0, score: 0 }
      ]);
    });
};
