const {app} = require('./configuration/server')
const projectRoutes = require('./routes/projectRoutes')

app.use('/saveProject',projectRoutes)


app.listen(8081,()=>{
    console.log("Server up and running at port 8081.")
})