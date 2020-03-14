exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("standings_format")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("standings_format").insert([
        {
          standings_format_id: 1,
          name: "points_A",
          description:
            "This format awards points according to how many players participate in a round. Each player is awarded 1 point times how many positions from last they are. If there are 20 players. 1st place gets 20 points, 2nd is 19 .. 10th 10 .. and last place 1. Handles ties and doubles. Use team names for members if your tracking team doubles. If you want to track individual players doubles points, each member the score of the team. We will eventually add in the ability to drop worst rounds."
        }
      ]);
    });
};
