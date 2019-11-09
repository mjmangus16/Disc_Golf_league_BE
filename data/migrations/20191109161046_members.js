exports.up = function(knex) {
  return knex.schema.createTable("members", members => {
    members.increments("member_id").unique();
    members.string("f_name").notNullable();
    members.string("l_name").notNullable();
    members
      .integer("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    members
      .integer("league_id")
      .unsigned()
      .notNullable()
      .references("league_id")
      .inTable("leagues")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("members");
};
