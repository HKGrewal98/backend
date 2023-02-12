const {app} = require('./configuration/server')
const userRoutes = require('./routes/login')
const projectRoutes = require('./routes/projectRoutes')
const reportRoute = require('./routes/reportRoutes')

app.use('/user',userRoutes)
app.use('/project',projectRoutes)
app.use('/report',reportRoute)

app.listen(8081,()=>{
    console.log("Server up and running at port 8081.")
})