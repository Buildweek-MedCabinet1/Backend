
exports.seed = function(knex) {
 
  return knex('patients_strains').insert([
    {patient_id:1,strain_id:1},
    {patient_id:1,strain_id:2},
    {patient_id:2, strain_id:2}
    
  ]);

};
