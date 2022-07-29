/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex.schema.raw('TRUNCATE users CASCADE')
  await knex('users').del()
  await knex('users').insert([
    {name: 'Calvin Suratos', color: 'wheat'},
    {name: 'Nehemiah Alvarado', color: 'blue'},
    {name: 'Cybyl Hancock', color: 'pink'},
    {name: 'Kyle Dilick', color: 'grey'}
  ]);
};
