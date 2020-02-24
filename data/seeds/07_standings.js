exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("standings")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("standings").insert([
        {
          standings_id: 1,
          members_count: 10,
          type: "points_A",
          league_id: 1
        },
        {
          standings_id: 2,
          members_count: 10,
          type: "points_A",
          league_id: 2
        }
      ]);
    });
};
