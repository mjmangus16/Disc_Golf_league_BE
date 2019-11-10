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
          org_name: "Organization 1"
        },
        {
          user_id: 2,
          email: "user2@email.com",
          password: "123456",
          f_name: "user2",
          l_name: "lastName2",
          org_name: "Organization 2"
        },
        {
          user_id: 3,
          email: "user3@email.com",
          password: "123456",
          f_name: "user3",
          l_name: "lastName3",
          org_name: "Organization 3"
        },
        {
          user_id: 4,
          email: "user4@email.com",
          password: "123456",
          f_name: "user4",
          l_name: "lastName4",
          org_name: "Organization 4"
        },
        {
          user_id: 5,
          email: "user5@email.com",
          password: "123456",
          f_name: "user5",
          l_name: "lastName5",
          org_name: "Organization 5"
        },
        {
          user_id: 6,
          email: "user6@email.com",
          password: "123456",
          f_name: "user6",
          l_name: "lastName6",
          org_name: "Organization 6"
        },
        {
          user_id: 7,
          email: "user7@email.com",
          password: "123456",
          f_name: "user7",
          l_name: "lastName7",
          org_name: "Organization 7"
        },
        {
          user_id: 8,
          email: "user8@email.com",
          password: "123456",
          f_name: "user8",
          l_name: "lastName8",
          org_name: "Organization 8"
        },
        {
          user_id: 9,
          email: "user9@email.com",
          password: "123456",
          f_name: "user9",
          l_name: "lastName9",
          org_name: "Organization 9"
        },
        {
          user_id: 10,
          email: "user10@email.com",
          password: "123456",
          f_name: "user10",
          l_name: "lastName10",
          org_name: "Organization 10"
        },
        {
          user_id: 11,
          email: "user11@email.com",
          password: "123456",
          f_name: "user11",
          l_name: "lastName11",
          org_name: "Organization 11"
        },
        {
          user_id: 12,
          email: "user12@email.com",
          password: "123456",
          f_name: "user12",
          l_name: "lastName12",
          org_name: "Organization 12"
        },
        {
          user_id: 13,
          email: "user13@email.com",
          password: "123456",
          f_name: "user13",
          l_name: "lastName13",
          org_name: "Organization 13"
        },
        {
          user_id: 14,
          email: "user14@email.com",
          password: "123456",
          f_name: "user14",
          l_name: "lastName14",
          org_name: "Organization 14"
        },
        {
          user_id: 15,
          email: "user15@email.com",
          password: "123456",
          f_name: "user15",
          l_name: "lastName15",
          org_name: "Organization 15"
        },
        {
          user_id: 16,
          email: "user16@email.com",
          password: "123456",
          f_name: "user16",
          l_name: "lastName16",
          org_name: "Organization 16"
        },
        {
          user_id: 17,
          email: "user17@email.com",
          password: "123456",
          f_name: "user17",
          l_name: "lastName17",
          org_name: "Organization 17"
        },
        {
          user_id: 18,
          email: "user18@email.com",
          password: "123456",
          f_name: "user18",
          l_name: "lastName18",
          org_name: "Organization 18"
        },
        {
          user_id: 19,
          email: "user19@email.com",
          password: "123456",
          f_name: "user19",
          l_name: "lastName19",
          org_name: "Organization 19"
        },
        {
          user_id: 20,
          email: "user20@email.com",
          password: "123456",
          f_name: "user20",
          l_name: "lastName20",
          org_name: "Organization 20"
        }
      ]);
    });
};
