/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments();
        table.string('name');
        table.timestamp('start_date');
        table.timestamp('end_date');
        table.string('description');
        table.integer('users_id').notNullable();
        table.foreign('users_id').references('users.id').onDelete('cascade');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('events', table => {
    table.dropForeign('user_id')
  })
  .then(() => knex.schema.dropTableIfExists('events'));
};
