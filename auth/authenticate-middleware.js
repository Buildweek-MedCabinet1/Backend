const jwt = require('jsonwebtoken');
const secrets = require('../database/config/secrets.js');
const { jwtSecret } = require('../database/config/secrets.js');

module.exports = (req,res,next)=>{
    const token = req.headers.authorization

    if(token){
        jwt.verify(token,secrets.jwtSecret, (err,decodedToken)=>{
            if(err){
                // console.log("token from authentication middleware",token)
                res.status(401).json({message:"token denied"})
            } else {
                req.decodedJwt = decodedToken;
                // console.log("decoded token from authentication middleware", decodedToken);
                next()
            }
        })
    } else {
        res.status(401).json({message: "You lack a token"})
    }
}