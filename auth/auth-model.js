const db = require('../database/connection.js');

module.exports = {
    find,
    findBy,
    add,
    findById,
   
}

function find(){
    return db('users')
}

function findBy(filter){
    return db('users').where(filter).orderBy('id');
} //never used

async function add(user){
    try{
        const [id] = await db('users').insert(user,'id')
        return(findById(id))
    }
    catch(error){   
        throw(error)
    }
}

function findById(id){
    return db('users').where({id}).first()
}

