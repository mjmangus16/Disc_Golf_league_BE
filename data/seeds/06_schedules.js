exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("schedules")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("schedules").insert([
        {
          schedule_id: 1,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 2,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 3,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 4,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 5,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 6,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 7,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 8,
          date: "20191125",
          info: "",
          league_id: 1
        },
        {
          schedule_id: 9,
          date: "20191125",
          info: "",
          league_id: 1
        }
      ]);
    });
};
