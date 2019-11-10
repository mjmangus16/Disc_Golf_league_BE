exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments("user_id").unique();
    users
      .string("email")
      .notNullable()
      .unique();
    users.string("password").notNullable();
    users.string("f_name").notNullable();
    users.string("l_name").notNullable();
    users.string("org_name");
    users
      .boolean("admin")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
