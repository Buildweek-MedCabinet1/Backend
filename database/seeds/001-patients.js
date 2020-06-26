
exports.seed = function(knex,Promise) {
 
      return knex('patients').insert([
        { patient_name:'Yahzick',desired_effects:'pain relief',consumption_prefs:'edible' },
        { patient_name:'RJB', desired_effects:'modify memory', consumption_prefs:'topical'}
        
      ]);
  
};
