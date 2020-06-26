
exports.up = function(knex) {
  return knex.schema
  .createTable('patients',tbl=>{
      tbl.increments('id');
      tbl.string('patient_name',128).notNullable();
      
      tbl.string('saved_items');
      tbl.string('desired_effects');
      tbl.string('unwanted_effects');
      tbl.string('consumption_prefs');
      

  })

  .createTable('strains', tbl=>{
      tbl.increments('id');
      tbl.string('strain_name',128).unique().notNullable();
      tbl.string('effects');
      tbl.string('side_effects');
      
  })
  .createTable('consumption',tbl=>{
      tbl.increments('id');
      tbl.string('consumption_name',128).notNullable().unique()
      
  })
  .createTable('patients_strains',tbl=>{
      tbl.integer('patient_id')
      .notNullable()
      .unsigned()
      .references('patients.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      tbl.integer('strain_id')
      .notNullable()
      .unsigned()
      .references('strains.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      tbl.primary(['patient_id','strain_id'])
  })

  .createTable('users', users=>{
      users.increments();

      users
      .string('username',255)
      .notNullable()
      .unique()
      users.string('password',255).notNullable();
      users.string('favorites')
  })
  .createTable('favorites',tbl=>{
      tbl.increments('id')
      tbl.string("strain").notNullable()
      tbl.integer('db_id').notNullable()
      tbl.integer("user_id")
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('patients_strains')
    .dropTableIfExists('consumption')
    .dropTableIfExists('strains')
    .dropTableIfExists('patients')
    .dropTableIfExists('favorites')
};
