const db = require('../dbConfig.js');

module.exports = {

    get,
    update,
    remove,
    findById,
    addFavorite,
    getFavorite,
    removeFavorite,
    findFavById
}

function get(){
    return db('users')
}

function getFavorite(id){
    return db('favorites').where('user_id',id)
}

function update(changes,id){
    return db('users')
    .where('id',id)
    .update(changes)
}

function remove(id) {
    return db('users')
    .where('id',id)
    .del()
}

function removeFavorite(id){
    return db('favorites')
    .where('id',id)
    .del()
}

function findById(id){
    return db('users').where({id}).first()
}

function findFavById(id){
    return db('favorites').where({id}).first()
}

async function addFavorite(favorite) {
    try{
        const [id] = await db('favorites').insert(favorite,'id')
        return(findFavById(id))
    }
    catch(error){
        throw(error)
    }
 
}