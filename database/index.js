//  const { default: mongoose } = require('mongoose')
const mongoose=require('mongoose')


const sai=new Promise((res,rej)=>{
    const url='mongodb://localhost:27017'
    mongoose.connect(url,(err)=>{
        if(err){
            console.log(err)
           return rej()
        }
        console.log('connected')
        res()

    })
})
module.exports = sai