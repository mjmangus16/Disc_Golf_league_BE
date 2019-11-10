exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rounds")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("rounds").insert([
        {
          round_id: 1,
          league_id: 1,
          date: "11/05/2017",
          round_num: 1,
          type: "singles"
        },
        {
          round_id: 2,
          league_id: 1,
          date: "11/05/2017",
          round_num: 1,
          type: "doubles"
        },
        {
          round_id: 3,
          league_id: 1,
          date: "11/12/2017",
          round_num: 2,
          type: "singles"
        },
        {
          round_id: 4,
          league_id: 1,
          date: "11/12/2017",
          round_num: 2,
          type: "doubles"
        },
        {
          round_id: 5,
          league_id: 1,
          date: "11/19/2017",
          round_num: 3,
          type: "singles"
        },
        {
          round_id: 6,
          league_id: 1,
          date: "11/19/2017",
          round_num: 3,
          type: "doubles"
        },
        {
          round_id: 7,
          league_id: 1,
          date: "11/26/2017",
          round_num: 4,
          type: "singles"
        },
        {
          round_id: 8,
          league_id: 1,
          date: "11/26/2017",
          round_num: 4,
          type: "doubles"
        },
        {
          round_id: 9,
          league_id: 2,
          date: "11/05/2018",
          round_num: 1,
          type: "singles"
        },
        {
          round_id: 10,
          league_id: 2,
          date: "11/05/2018",
          round_num: 1,
          type: "doubles"
        },
        {
          round_id: 11,
          league_id: 2,
          date: "11/12/2018",
          round_num: 2,
          type: "singles"
        },
        {
          round_id: 12,
          league_id: 2,
          date: "11/12/2018",
          round_num: 2,
          type: "doubles"
        },
        {
          round_id: 13,
          league_id: 2,
          date: "11/19/2018",
          round_num: 3,
          type: "singles"
        },
        {
          round_id: 14,
          league_id: 2,
          date: "11/19/2018",
          round_num: 3,
          type: "doubles"
        },
        {
          round_id: 15,
          league_id: 2,
          date: "11/26/2018",
          round_num: 4,
          type: "singles"
        },
        {
          round_id: 16,
          league_id: 2,
          date: "11/26/2018",
          round_num: 4,
          type: "doubles"
        },
        {
          round_id: 17,
          league_id: 3,
          date: "11/05/2019",
          round_num: 1,
          type: "singles"
        },
        {
          round_id: 18,
          league_id: 3,
          date: "11/05/2019",
          round_num: 1,
          type: "doubles"
        },
        {
          round_id: 19,
          league_id: 3,
          date: "11/12/2019",
          round_num: 2,
          type: "singles"
        },
        {
          round_id: 20,
          league_id: 3,
          date: "11/12/2019",
          round_num: 2,
          type: "doubles"
        },
        {
          round_id: 21,
          league_id: 3,
          date: "11/19/2019",
          round_num: 3,
          type: "singles"
        },
        {
          round_id: 22,
          league_id: 3,
          date: "11/19/2019",
          round_num: 3,
          type: "doubles"
        },
        {
          round_id: 23,
          league_id: 3,
          date: "11/26/2019",
          round_num: 4,
          type: "singles"
        },
        {
          round_id: 24,
          league_id: 3,
          date: "11/26/2019",
          round_num: 4,
          type: "doubles"
        },
        {
          round_id: 25,
          league_id: 5,
          date: "03/07/2019",
          round_num: 1,
          type: "singles"
        },
        {
          round_id: 26,
          league_id: 5,
          date: "03/14/2019",
          round_num: 2,
          type: "singles"
        },
        {
          round_id: 27,
          league_id: 5,
          date: "03/21/2019",
          round_num: 3,
          type: "singles"
        },
        {
          round_id: 28,
          league_id: 5,
          date: "03/28/2019",
          round_num: 4,
          type: "singles"
        },
        {
          round_id: 29,
          league_id: 5,
          date: "04/04/2019",
          round_num: 5,
          type: "singles"
        },
        {
          round_id: 30,
          league_id: 5,
          date: "04/11/2019",
          round_num: 6,
          type: "singles"
        },
        {
          round_id: 31,
          league_id: 5,
          date: "04/11/2019",
          round_num: 7,
          type: "singles"
        },
        {
          round_id: 32,
          league_id: 5,
          date: "04/18/2019",
          round_num: 8,
          type: "singles"
        },
        {
          round_id: 33,
          league_id: 5,
          date: "04/25/2019",
          round_num: 9,
          type: "singles"
        },
        {
          round_id: 34,
          league_id: 5,
          date: "05/02/2019",
          round_num: 10,
          type: "singles"
        },
        {
          round_id: 35,
          league_id: 4,
          date: "03/07/2019",
          round_num: 1,
          type: "doubles"
        },
        {
          round_id: 36,
          league_id: 4,
          date: "03/14/2019",
          round_num: 2,
          type: "doubles"
        },
        {
          round_id: 37,
          league_id: 4,
          date: "03/21/2019",
          round_num: 3,
          type: "doubles"
        },
        {
          round_id: 38,
          league_id: 4,
          date: "03/28/2019",
          round_num: 4,
          type: "doubles"
        },
        {
          round_id: 39,
          league_id: 4,
          date: "04/04/2019",
          round_num: 5,
          type: "doubles"
        },
        {
          round_id: 40,
          league_id: 4,
          date: "04/11/2019",
          round_num: 6,
          type: "doubles"
        },
        {
          round_id: 41,
          league_id: 4,
          date: "04/11/2019",
          round_num: 7,
          type: "doubles"
        },
        {
          round_id: 42,
          league_id: 4,
          date: "04/18/2019",
          round_num: 8,
          type: "doubles"
        },
        {
          round_id: 43,
          league_id: 4,
          date: "04/25/2019",
          round_num: 9,
          type: "doubles"
        },
        {
          round_id: 44,
          league_id: 4,
          date: "05/02/2019",
          round_num: 10,
          type: "doubles"
        }
        // {
        //   round_id: 45,
        //   league_id: 6,
        //   date: "03/07/2019",
        //   round_num: 1,
        //   type: "singles"
        // },
        // {
        //   round_id: 46,
        //   league_id: 6,
        //   date: "03/14/2019",
        //   round_num: 2,
        //   type: "singles"
        // },
        // {
        //   round_id: 47,
        //   league_id: 6,
        //   date: "03/21/2019",
        //   round_num: 3,
        //   type: "singles"
        // },
        // {
        //   round_id: 48,
        //   league_id: 6,
        //   date: "03/28/2019",
        //   round_num: 4,
        //   type: "singles"
        // },
        // {
        //   round_id: 49,
        //   league_id: 6,
        //   date: "04/04/2019",
        //   round_num: 5,
        //   type: "singles"
        // },
        // {
        //   round_id: 50,
        //   league_id: 6,
        //   date: "04/11/2019",
        //   round_num: 6,
        //   type: "singles"
        // },
        // {
        //   round_id: 51,
        //   league_id: 6,
        //   date: "04/11/2019",
        //   round_num: 7,
        //   type: "singles"
        // },
        // {
        //   round_id: 52,
        //   league_id: 6,
        //   date: "04/18/2019",
        //   round_num: 8,
        //   type: "singles"
        // },
        // {
        //   round_id: 53,
        //   league_id: 6,
        //   date: "04/25/2019",
        //   round_num: 9,
        //   type: "singles"
        // },
        // {
        //   round_id: 54,
        //   league_id: 6,
        //   date: "05/02/2019",
        //   round_num: 10,
        //   type: "singles"
        // },
      ]);
    });
};
