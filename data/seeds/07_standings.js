exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("standings_format")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("standings_format").insert([
        {
          standings_format_id: 1,
          members_count: 10,
          type: "points",
          league_id: 1
        }
      ]);
    });
};
