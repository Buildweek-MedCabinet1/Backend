
exports.seed = function(knex) {
 
  return knex('strains').insert([
    { strain_name:'Northern Lights',effects:'pain relief',side_effects:'couch lock' },
    { strain_name:'Super Lemon Haze',effects:'modify memory',side_effects:'dry mouth' }
    
  ]);

};
//this is not a one to many, this is a many to many, will need to make a bridge between consumption and strains