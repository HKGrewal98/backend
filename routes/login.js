const LocalStrategy = require('passport-local').Strategy
const {passport} = require('../configuration/server')
const db = require('../database/userDao')
const bcrypt = require('bcrypt')
const {express} = require('../configuration/server')



const loginApp = express.Router()

passport.use(new LocalStrategy({usernameField:'userId',passwordField:'password'},async function(username,password,cb){
        
    const user = await db.getUserById(username)

    if(!user){
        return cb(null,false)
    }
    
    const comparePassword = bcrypt.compareSync(password,user.password)

    if(!comparePassword){
        return cb(null,false)
    }

    cb(null,user)
}
))


passport.serializeUser(function(user,cb){
    process.nextTick(function(){
        var date = new Date()
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return cb(null,{
            userId:user.id,
            created_at:date,
            is_engineer:user.is_engineer,
            is_reviewer:user.is_reviewer
        })
    })
})

passport.deserializeUser(function(user,cb){
    process.nextTick(async function(){
        console.log("IN deserialize and user is : " + JSON.stringify(user))
         const existingUser = await db.getUserById(user.userId)
         if(!existingUser){
            console.log("In deserializing no user with id " + user.userId)
            return cb(null,false)
         }
         console.log("In deserilizing user authenticated....")
         return cb(null,user)
    })
})

function authenticate(req,res,next){
    return req.isAuthenticated() ?
    next() :  
    res.json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
}


loginApp.post('/signUp',async (req,res)=>{
   
    const newUser = await db.saveUser(req.body)
    if(!newUser){
      return res.status(500).json({status:"FAILURE",message:"User creation failed."})
    }
    return res.json({status:"SUCCESS",message:`User created with userId ${newUser}.`})
})

loginApp.post('/login',passport.authenticate('local'),(req,res)=>{  
     req.session.save()
     res.json({status:"SUCCESS",message:"User is Logged in.",data:{...req.session.passport.user,isLoggedIn:true}})
})


loginApp.post('/logout',authenticate,(req,res)=>{
    req.session.destroy(function(err){
        res.clearCookie('connect.sid');
        if(err){
            return res.status(500).json({status:"FAILURE",message:`Logout error ${err}.`})
        }  
        return res.json({status:"SUCCESS",message:"User logged out Successfully."})
    })
})


loginApp.get('/',(req,res)=>{
    return req.isAuthenticated() ?
     res.json({status:"SUCCESS",data:{...req.session.passport.user}}) :  
     res.json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
})


loginApp.post('/merchant',authenticate,async (req,res)=>{
    const response =  await db.saveManufacturer(req.body)

    if(response.getStatusCode() === 200){
        return res.json(response.getSuccessObject())
    }
    res.json(response.getErrorObject())
})

   

module.exports = loginApp






