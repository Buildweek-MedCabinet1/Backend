// Update with your config settings.
require("dotenv").config();

const pgConnection = process.env.Database_URL || "postgresql://postgres@localhost/auth";


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/medcab.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      
    },
    seeds: { directory: "./database/seeds"},
    pool:{
      afterCreate: (conn,done)=>{
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },

  staging: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:"./database/migrations"
    },
    seeds:{
      directory:"./database/seeds"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
