exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("members")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("members").insert([
        {
          member_id: 1,
          f_name: "Michael",
          l_name: "Mangus",
          user_id: 1,
          league_id: 1
        },
        {
          member_id: 2,
          f_name: "Joe",
          l_name: "Doe",
          user_id: 2,
          league_id: 1
        },
        {
          member_id: 3,
          f_name: "Jane",
          l_name: "Host",
          user_id: 3,
          league_id: 1
        },
        {
          member_id: 4,
          f_name: "Mike",
          l_name: "Gus",
          user_id: 4,
          league_id: 1
        },
        {
          member_id: 5,
          f_name: "Tom",
          l_name: "Middles",
          user_id: 5,
          league_id: 1
        },
        {
          member_id: 6,
          f_name: "John",
          l_name: "Smith",
          user_id: 6,
          league_id: 1
        },
        {
          member_id: 7,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: 7,
          league_id: 1
        },
        {
          member_id: 8,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: 8,
          league_id: 1
        },
        {
          member_id: 9,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: 9,
          league_id: 1
        },
        {
          member_id: 10,
          f_name: "Harry",
          l_name: "Soft",
          user_id: 10,
          league_id: 1
        },
        {
          member_id: 11,
          f_name: "Tom",
          l_name: "Smith",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 12,
          f_name: "Joe",
          l_name: "Doe",
          user_id: 2,
          league_id: 2
        },
        {
          member_id: 13,
          f_name: "Jane",
          l_name: "Host",
          user_id: 3,
          league_id: 2
        },
        {
          member_id: 14,
          f_name: "Mike",
          l_name: "Gus",
          user_id: 4,
          league_id: 2
        },
        {
          member_id: 15,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 16,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 17,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 18,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 19,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 20,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 2
        },
        {
          member_id: 21,
          f_name: "Tom",
          l_name: "Smith",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 22,
          f_name: "Joe",
          l_name: "Doe",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 23,
          f_name: "Jane",
          l_name: "Host",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 24,
          f_name: "Mike",
          l_name: "Gus",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 25,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 26,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 27,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 28,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 29,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 30,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 31,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 32,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 33,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 34,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 35,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 36,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 37,
          f_name: "Tom",
          l_name: "Smith",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 38,
          f_name: "Joe",
          l_name: "Doe",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 39,
          f_name: "Jane",
          l_name: "Host",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 40,
          f_name: "Mike",
          l_name: "Gus",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 41,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 42,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 43,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 44,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 45,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 46,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 47,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 3
        },
        {
          member_id: 48,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 49,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 50,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 4
        },
        {
          member_id: 51,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 52,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 53,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 54,
          f_name: "Tom",
          l_name: "Smith",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 55,
          f_name: "Joe",
          l_name: "Doe",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 56,
          f_name: "Jane",
          l_name: "Host",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 57,
          f_name: "Mike",
          l_name: "Gus",
          user_id: null,
          league_id: 5
        },
        {
          member_id: 58,
          f_name: "Tom",
          l_name: "Middles",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 59,
          f_name: "John",
          l_name: "Smith",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 60,
          f_name: "Mitch",
          l_name: "Camer",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 61,
          f_name: "Jessica",
          l_name: "Brand",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 62,
          f_name: "Tom",
          l_name: "Sawyer",
          user_id: null,
          league_id: 6
        },
        {
          member_id: 63,
          f_name: "Harry",
          l_name: "Soft",
          user_id: null,
          league_id: 6
        }
      ]);
    });
};
