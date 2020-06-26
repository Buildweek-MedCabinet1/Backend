/**need a way to get strains from the API by the db_id in user favorites
 * return strains where database === db_id
 */

 const db = require('../database/dbConfig.js')
 const axios = require('axios')

 function getRemoteApi(){
    const requestOptions = {
        headers: {accept: 'application/json'}
    }
    return db('http://strainapi.evanbusse.com/z744fBo/strains/search/all',requestOptions)
//     axios
//     .get('http://strainapi.evanbusse.com/z744fBo/strains/search/all',requestOptions)
//     .then(response=>{
//         // console.log(response)
//         res.status(200).json(response.data)
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({message:'Error fecthing from API', error:err})
//     })

    }

 module.exports = {
     getRemoteApi
 }

 /**
  * TODO: NIGHTOF 6252020
  * LINK TO DS API Maybe?
  * CHANGE REQUESTED PARAMETERS
  * ADD IN ERROR HANDLING FOR MULTIPLE OF THE SAME USER IDS
  * ADD IN ERROR HANDLING MESSAGES IN EVERY ROUTER
  * 
  */