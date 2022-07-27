/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  
  await knex('events').del()
  await knex('events').insert([
    {name: 'Meeting One', start_date: new Date(2022, 7, 22, 8, 30 ), end_date: new Date(2022, 7, 22, 10, 30 ) , description: "School" , users_id: 1},
    {name: 'Meeting Two', start_date: new Date(2022, 7, 7) , end_date: new Date(2022, 7, 14) , description: "Work" , users_id: 2},
    {name: 'Meeting Three', start_date: new Date(2022, 8, 15, 14, 0 ), end_date: new Date(2022, 8, 15, 14, 30 ), description: "Professional Development. Supra Coders internship", users_id: 3} ,
    {name: 'Meeting Four', start_date: new Date(2022, 11, 12 ), end_date: new Date(2022, 11, 12 ), description: "Take my kids to the park", users_id: 4},
    {name: 'Soccer Practice', start_date: new Date(2022, 10, 16, 16, 30 ), end_date: new Date(2022, 10, 16, 20, 0 ), description: "Train for the World Cup series", users_id: 4},
  ]);
};

// new Date(year, monthIndex, day, hours, minutes)
