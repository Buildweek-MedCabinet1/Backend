const express = require('express');

const MedCab = require('./medcab-model.js');

const db = require('../dbConfig.js')
const router = express.Router();



router.get('/patients',(req,res)=>{
    MedCab.findPatient()
    .then(patients=>{
        res.json(patients)
    })
    .catch(err=>{
        res.status(500).json({message:'db failed to return patients'})
    })
})

router.get('/strains',(req,res)=>{
    MedCab.findStrain()
    .then(strains=>{
        res.json(strains)
    })
    .catch(err=>{
        res.status(500).json({message:'db failed to return strains'})
    })
})

router.get('/patients:id', validatePatientID, async (req,res)=>{
    try{
        //i made an import that would handle this without declarations and didn't use it.
        //TODO - Streamline all requests
        const {id} = req.params;
        const patients = await db('patients').where('id',id)
        res.json(patients)
    }
    catch(err){
        errorMessage(err)
    }
})

router.get('/strains:id', validateStrainID, async (req,res)=>{
    try{
        const {id} = req.params;
        const strains = await db('strains').where('id',id)
        res.json(strains)
    }
    catch(err){
        errorMessage(err)
    }
})





/////*********MIDDLEWARE */////////////

async function validatePatientID(req,res,next){
    const {id} = req.params;
    console.log("middleware, req.params", req.params)
    const accounts = await db('patients').where('id',id)
    if(accounts.length === 0){
        next(res.status(404).json({message:"Not found"}))
    }
    else{
        next()
    }
}

async function validateStrainID(req,res,next){
    const {id} = req.params;
    const strains = await db('strains').where('id', id)
    if(strains.length === 0){
        next(res.status(404).json({message:"Not found"}))
    }
    else{
        next()
    }
}


function errorMessage(error){
    const err = error;
    res.status(500).json({message:"Problem with DB", error:err})
}



module.exports = router;