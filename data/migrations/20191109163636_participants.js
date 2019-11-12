exports.up = function(knex) {
  return knex.schema.createTable("participants", participants => {
    participants.increments("participant_id").unique();
    participants
      .integer("member_id")
      .unsigned()
      .notNullable()
      .references("member_id")
      .inTable("members")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    participants
      .integer("round_id")
      .unsigned()
      .notNullable()
      .references("round_id")
      .inTable("rounds")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    participants.integer("score").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("participants");
};
