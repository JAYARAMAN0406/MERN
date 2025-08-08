const connect=require("./connect")
const express=require("express")
const cors = require("cors")
const user =require("./routes/UserRoutes")
const login= require("./routes/LoginRoutes")
const employee= require("./routes/EmployeeRoutes")

const app=express()
const PORT=5000

app.use(cors())
app.use(express.json())
app.use(user)
app.use(login)
app.use(employee)

app.listen(PORT, ()=>{
  connect.connectToServer()
})