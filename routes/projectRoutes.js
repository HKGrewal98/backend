const {express} = require('../configuration/server')
const serviceMethods = require('../service/projectInfo')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
console.log("appDir  : " + appDir)

const projectRoutes = express.Router()

projectRoutes.post('/', (req,res)=>{
    return serviceMethods.saveProject(req.body,res)
 })

 projectRoutes.get('/download', async (req,res)=>{
    await serviceMethods.downloadFile()
    return res.download(appDir + '/static/file.csv','ProjectDoc.csv',(err)=>{
        if(err){
            res.json("Download Unavailable.")
        }
        console.log("File sent to the client successfully.")
    })
 })



 module.exports = projectRoutes