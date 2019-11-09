exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("members")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("members").insert([
        {
          member_id: 1,
          f_name: "Tom",
          l_name: "Smith",
          user_id: 0,
          league_id: 0
        }
      ]);
    });
};
