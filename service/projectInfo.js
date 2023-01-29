
const dbMethods = require('../database/dao')
const helpers = require('../heplers/createCSV')

 
 async function saveProject(data,res){
   const response =  await dbMethods.saveProjectInfo(data,res)
   res.status(response.getStatusCode()).json(response.getResponseObject())
}


async function downloadFile(){
    const result = await dbMethods.getAllProjects()
    helpers.createCSV(result)
}

module.exports = {saveProject,downloadFile}