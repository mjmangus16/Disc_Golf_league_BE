exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: 1,
          email: "user1@email.com",
          password: "123456",
          f_name: "user1",
          l_name: "lastName1",
          org_name: "Organization 1",
          admin: true
        },
        {
          user_id: 2,
          email: "user2@email.com",
          password: "123456",
          f_name: "user2",
          l_name: "lastName2",
          admin: false
        },
        {
          user_id: 3,
          email: "user3@email.com",
          password: "123456",
          f_name: "user3",
          l_name: "lastName3",
          admin: false
        },
        {
          user_id: 4,
          email: "user4@email.com",
          password: "123456",
          f_name: "user4",
          l_name: "lastName4",
          admin: false
        },
        {
          user_id: 5,
          email: "user5@email.com",
          password: "123456",
          f_name: "user5",
          l_name: "lastName5",
          admin: false
        },
        {
          user_id: 6,
          email: "user6@email.com",
          password: "123456",
          f_name: "user6",
          l_name: "lastName6",
          admin: false
        },
        {
          user_id: 7,
          email: "user7@email.com",
          password: "123456",
          f_name: "user7",
          l_name: "lastName7",
          admin: false
        },
        {
          user_id: 8,
          email: "user8@email.com",
          password: "123456",
          f_name: "user8",
          l_name: "lastName8",
          admin: false
        },
        {
          user_id: 9,
          email: "user9@email.com",
          password: "123456",
          f_name: "user9",
          l_name: "lastName9",
          admin: false
        },
        {
          user_id: 10,
          email: "user10@email.com",
          password: "123456",
          f_name: "user10",
          l_name: "lastName10",
          admin: false
        },
        {
          user_id: 11,
          email: "user11@email.com",
          password: "123456",
          f_name: "user11",
          l_name: "lastName11",
          admin: false
        },
        {
          user_id: 12,
          email: "user12@email.com",
          password: "123456",
          f_name: "user12",
          l_name: "lastName12",
          admin: false
        },
        {
          user_id: 13,
          email: "user13@email.com",
          password: "123456",
          f_name: "user13",
          l_name: "lastName13",
          admin: false
        },
        {
          user_id: 14,
          email: "user14@email.com",
          password: "123456",
          f_name: "user14",
          l_name: "lastName14",
          admin: false
        },
        {
          user_id: 15,
          email: "user15@email.com",
          password: "123456",
          f_name: "user15",
          l_name: "lastName15",
          admin: false
        },
        {
          user_id: 16,
          email: "user16@email.com",
          password: "123456",
          f_name: "user16",
          l_name: "lastName16",
          admin: false
        },
        {
          user_id: 17,
          email: "user17@email.com",
          password: "123456",
          f_name: "user17",
          l_name: "lastName17",
          admin: false
        },
        {
          user_id: 18,
          email: "user18@email.com",
          password: "123456",
          f_name: "user18",
          l_name: "lastName18",
          admin: false
        },
        {
          user_id: 19,
          email: "user19@email.com",
          password: "123456",
          f_name: "user19",
          l_name: "lastName19",
          admin: false
        },
        {
          user_id: 20,
          email: "user20@email.com",
          password: "123456",
          f_name: "user20",
          l_name: "lastName20",
          admin: false
        },
        {
          user_id: 21,
          email: "user21@email.com",
          password: "123456",
          f_name: "user12",
          l_name: "lastName21",
          org_name: "Organization 21",
          admin: true
        }
      ]);
    });
};
