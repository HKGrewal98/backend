
const dbMethods = require('../database/dao')
 

 async function saveProject(data,res){
   const response =  await dbMethods.saveProjectInfo(data,res)
   console.log(response)
   res.status(response.getStatusCode()).json(response.getResponseObject())
}

module.exports = {saveProject}