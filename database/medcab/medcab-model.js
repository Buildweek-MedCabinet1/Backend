const db = require('../dbConfig.js');

function findPatient(){
    return db('patients')
}

function findStrain(){
    return db('strains')
}

function findPatientById(id){
    return db('patients').where({id}).first()
}

function findStrainById(id){
    return db('strains').where({id}).first()
}

function findFilter(filter){
    return db('strains').where({filter}).first()
}
//^^^^^^^ use this to filter by user selected params





module.exports = {
    findPatient,
    findStrain,
    findStrainById,
    findPatientById
}