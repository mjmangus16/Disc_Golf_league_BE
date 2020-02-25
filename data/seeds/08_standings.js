exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("standings")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("standings").insert([
        {
          standings_id: 1,
          standings_format_id: 1,
          league_id: 1
        },
        {
          standings_id: 2,
          standings_format_id: 1,
          league_id: 2
        }
      ]);
    });
};
