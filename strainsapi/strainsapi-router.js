const axios = require('axios');
const authenticate = require('../auth/authenticate-middleware.js')
const router = require('express').Router();

const Strains = require('./strainsapi-model.js')
const db = require('../database/dbConfig.js')

router.get('/', (req,res)=>{
   let data = [];
    // Strains.getRemoteApi()
    // .then(strains=>{
    //     res.status(200).json(strains)
    // })
    // .catch(err=>{
    //     console.log(err)
    //     res.status(500).json({message:"database error"})
    // })
    
    const requestOptions = {
        headers: {accept: 'application/json'}
    }

    axios
    .get('http://strainapi.evanbusse.com/z744fBo/strains/search/all/',requestOptions)
    .then(response=>{
        // res.status(200).json(response.data)
        data = response.data
    })
    .then(one=>{
        console.log(searchData(data))
        res.status(200).json(searchData(data))
        // // let newthing = searchObject(data, )
       
       
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:'Error fecthing from API', error:err})
    })

    
  
})

router.get('/:id',(req,res)=>{

    const requestOptions = {
        header: {accept: 'application/json'}
    }
    const data =  
     axios
    .get('http://strainapi.evanbusse.com/z744fBo/strains/search/all',requestOptions)
    .then(response=>{
        
        res.status(200).json(response.data)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:'Error fecthing from API', error:err})
    })
    console.log(data)
    
})



// function searchObject (obj,query){
//     for(var key in obj){
//         var value = obj[key];
//         if(typeof value === 'object'){
//             searchObject(value,query)
//         }
//         if(value === query) {
//             console.log('property=' + key + 'value= '+ value)
//         }
//     }
// }

function searchData (object,id) {
    let outObj = []
    const thing = Object.values(object)
    // console.log(thing.id)
    //gets the types of values this is an array
    //to match data you need to do thing[1].id for the id
    const arrayOfNames = Object.getOwnPropertyNames(object)
    //gets the array of names from the API
    const size = Object.keys(object).length
    //gets the size of the data
    // console.log(thing)
    for(let i = 0; i<9; i++){
        let name = arrayOfNames[i]
        let id = thing[i].id
        let race = thing[i].race
        outObj.push({"id":id,"name":name,"race":race})
        // let newObj = {...outObj, "id":id,"name":name,"race":race }
        // outObj = newObj;
    }
    return outObj;
}

module.exports = router