
exports.seed = function(knex) {
 
  return knex('consumption').insert([
    { consumption_name:'Edible' },
    
    
  ]);

};