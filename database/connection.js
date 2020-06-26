const knex = require('knex')

const knexfile = require('../knexfile.js');
const environment = process.env.NODE_ENV || "development";
// This forces the environment, will attempt to change it server side later
// const environment = "development";

module.exports = knex(knexfile[environment])