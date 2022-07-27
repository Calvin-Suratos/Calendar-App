/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('app_authors').select('*')
    .then((rows) => {
      if (rows.length === 0) {
        return knex('app_authors').insert([
          {first_name: 'Kyle', last_name: 'Dilick'},
          {first_name: 'Nehemiah', last_name: 'Alvarado'},
          {first_name: 'Cybyl', last_name: 'Hancock'},
          {first_name: 'Calvin', last_name: 'Suratos'}
        ]);
      }
    })
};