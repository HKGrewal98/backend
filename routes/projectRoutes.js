const {express} = require('../configuration/server')
const projectMethods = require('../service/projectService')

const projectRoute = express.Router()

projectRoute.use((req,res,next)=>{
        if(!req.isAuthenticated()){
            return res.status(401).json({status:"FAILURE",message:"Please login.",isLoggedIn:false})
        }
        next()
})

projectRoute.post('/save',async (req,res)=>{
      return await projectMethods.saveProject(req.user.userId,req.body,res)
})

projectRoute.get('/',async (req,res)=> {
   const {name} = req.query
   return await projectMethods.getProjectsByName(req.user.userId,name,res)
})

projectRoute.get('/search',async(req,res)=>{
    return await projectMethods.getManufactureOrProjectInfo(req,res)
})

module.exports = projectRoute