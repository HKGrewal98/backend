const {express} = require('../configuration/server')
const serviceMethods = require('../service/projectInfo')

const projectRoutes = express.Router()

projectRoutes.post('/', (req,res)=>{
    return serviceMethods.saveProject(req.body,res)
 })

 module.exports = projectRoutes