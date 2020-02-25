exports.up = function(knex) {
  return knex.schema.createTable("standings_format", standings => {
    standings.increments("standings_format_id").unique();
    standings.string("name");
    standings.string("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("standings_format");
};
