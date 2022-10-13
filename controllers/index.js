 const express= require('express')
 const user= express.Router()
const axios= require('axios')
const userschema=require("../database/userschema")



 user.get("/:name",async(req,res)=>{
    const {name}=req.params
    console.log(userschema)
    var followers,repos,userdata,following

    axios.get(`https://api.github.com/search/users?q=${name}`)
 .then(async(x)=>{
    userdata=x.data
//     var log=userdata.login
//     await axios.get(`https://api.github.com/users/${name}/followers`).then((x)=>followers=x.data)
//     await axios.get(`https://api.github.com/users/${name}/repos`).then((x)=>repos=x.data)
//     await axios.get(`https://api.github.com/users/${name}/following`).then((x)=>following=x.data)
//     https://api.github.com/users/naseeb-shah/following
//     console.log('--------------------------------------------------')
//    console.log(userdata.item)
//    console.log('----------------------foloowres----------------------------')
// // console.log(followers)
// console.log('----------------------respos----------------------------')
// // console.log(repos)
// console.log('----------------------following----------------------------')
// // console.log(following)
res.send({
   data:userdata
})

 }).catch((e)=>res.send(e.response.data))

 
 

 })


 user.get('/det/:name',async(req,res)=>{
const {name}=req.params
var followers,repos,following,userdata
var user = userschema.findOne({
   username:name
   
},(result,error)=>{
   if(error){
      console.log(error)
   } else if(result){
      console.log(result.userdata)
   }
   else{
      res.send({
         "error":"somethin went worng"
      })
   }
})
// .then(x=>{ 
//    userdata=x.userdata,
//    follow=x.followers,
//    repos=x.repos,
//    following=x.following
// })
console.log(user)
if(!user){

console.log("from github")
axios.get(`https://api.github.com/search/users?q=${name}`).then(x=> userdata=x.data)


await axios.get(`https://api.github.com/users/${name}/followers`).then((x)=>followers=x.data)
await axios.get(`https://api.github.com/users/${name}/repos`).then((x)=>repos=x.data)
await axios.get(`https://api.github.com/users/${name}/following`).then((x)=>following=x.data)
// https://api.github.com/users/naseeb-shah/
var schema = new userschema({
   username:name,
   userdata:userdata,
   follow:following,
   followers:followers,
   repo:repos
})
schema.save()
// }
res.send({
   userdata:userdata,
   follow:followers,
   repos:repos,
   following:following
})
}
// else{
//    console.log("data from database")
//    userdata=x.userdata,
//    follow=x.followers,
//    repos=x.repos,
//    following=x.following
   
 })



 module.exports=user