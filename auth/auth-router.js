const bcryptjs = require('bcryptjs');
const db = require('../database/connection.js')
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secrets = require('../database/config/secrets.js')

const Auth = require('./auth-model.js');
const {isValid} = require('./auth-service.js');

//*************Test get below****************** */

router.get('/',(req,res)=>{
    res.status(200).json({message:"authentication is active, navigate to /register or /login"})
})


/***************Register POST here*********** */
router.post('/register',(req,res)=>{
    const credentials = req.body
    //add a way to check database for a similar name
    // checkDuplicate(credentials)
    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password,rounds);

        credentials.password = hash;

        Auth.add(credentials)
        .then(user=>{
            res.status(201).json({data:user})
        })
        .catch(error=>{
            console.log("auth/register error",error)
            res.status(500).json({message:"database error"})
        })
    }
})


/***********************Login POST here*************** */
//REMOVED PREFLIGHT TRANSLATOR
router.post('/login',  validateBody, async (req,res)=>{
   try{ 
    const {username,password} = req.body;

    if(isValid(req.body)){
        Auth.findBy({username:username})
        .then(([user])=>{
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = generateToken(user)
                res.status(200).json({
                    message:"You accessed the API, this message can change, or never be seen by the user",
                    token
                })
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
        })
    } else {
        res.status(400).json({
            message:"Please provide a username and password"
        })
    }
    }
    catch(err){
        res.status(500).json({message:"database error"})
    }
})






//*************Functions used************* */

function generateToken(user){
    const payload = {
        id: user.id,
        username: user.username,
        password: user.password
    }
    const options = {
        expiresIn: "2h"
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

/***********************MIDDLEWARE************ */

function preflightTranslator(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Mehtods", "GET,POST,PUT,DELETE")

    next()
}


function validateBody (req,res,next) {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        next(res.status(400).json({message:"All users require a username and a password"}))
    } else {
        next()
    }
}

// function checkDuplicate (req,res,next) {
//     const username = req
    
    

//     console.log('Check duplicate username', username)
//     console.log("data",data.config.pool)
    
// }

//FINISH WRITING TESTS 6/25/2020


module.exports = router