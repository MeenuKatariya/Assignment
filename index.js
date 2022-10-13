 const express= require('express')
const  user =require ('./controllers/index.js')
const sai = require("./database/index")
const app= express()
// console.log(user)
// app.use(cors())
const cors=require('cors')
app.use(cors())
app.use(express.json());

 app.use('/user',user) 
 










 app.listen(8080,e=>{
    e?console.log(e):console.log('server is started 8080')
 })
