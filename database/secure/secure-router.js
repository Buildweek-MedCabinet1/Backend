const axios = require('axios');
const Users = require('./secure-model.js')
const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const secrets = require('../config/secrets.js')

const {isValid} = require('../../auth/auth-service.js')




router.get('/', (req,res)=>{
     Users.get(req.query)
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"database error"})
    })
    
})

router.get('/:id', (req,res)=>{
    const {id} = req.params
    Users.findById(id)
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json({message: err})
    })
})

router.get('/:id/favorites', (req,res)=>{
    const {id} = req.params
    Users.getFavorite(id)
    .then(users=>{
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"database error"})
    })
})

/**************************DELETE********** */

router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    Users.remove(id)
    .then(deleted=>{
        if(deleted) {
            res.json({removed:deleted})
        } else {
            res.status(404).json({message:"Could not find user associated with that id"})
        }
    })
    .catch(err=>{
        res.status(500).json({message:"Database error, failed to delete user"})
    })
})

router.delete('/:id/favorites',validateDelete, (req,res)=>{
    console.log(req.body.deleter)
    const id = req.body.deleter;
    Users.removeFavorite(id)
    .then(deleted=>{
        if(deleted){
            res.json({removed:deleted})
        }else {
            res.status(404).json({message:"could not find favorite associated with ID"})
        }
    })
    
})

/******UPDATE****************** */

router.put('/:id', validateBody, (req,res)=>{
    const {id} = req.params;
    const changes = req.body;

    if(isValid(changes)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(changes.password,rounds)
        changes.password = hash;
    

    Users.findById(id)
    .then(user =>{
        if(user) {
            Users.update(changes,id)
            .then(updatedUser=>{
                res.json(updatedUser)
            }) 
        } else {
            res.status(404).json({message: "could not find user with that ID"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"database failed to update user"})
    })
    }
})

router.post('/:id/favorites', validateFavorites,(req,res)=>{
    const favorites = req.body

    Users.addFavorite(favorites)
    .then(entry=>{
        res.status(201).json({message:"Favorite added"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error adding favorite"})
    })
} )

//*******Middleware******************** */

function validateBody (req,res,next) {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        next(res.status(400).json({message:"All users require a username and a password"}))
    } else {
        next()
    }
}

function validateDelete (req,res,next){
    const del = req.body.deleter;
    if(!del){
        next(res.status(400).json({message:"this delete needs an object passed with a deleter:(id to be deleted)"}))
    } else {
        next()
    }
}

function validateFavorites (req,res,next) {
    
    const strain = req.body.name;
    const db_id = req.body.db_id;
    const user_id = req.body.user_id;

    if(!strain || !db_id || !user_id){
        next(res.status(400).json({message:"Include all data to add a favorite:  strain, user_id, db_id"}))
    } else{
        next()
    }
}

module.exports = router;