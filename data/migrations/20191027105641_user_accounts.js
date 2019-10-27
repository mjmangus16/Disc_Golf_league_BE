exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("user_id").unique();
    users
      .string("username")
      .notNullable()
      .unique();
    users.string("password");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
