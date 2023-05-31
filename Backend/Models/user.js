const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    timeStamp:String
})

const user = mongoose.model('User',userSchema);
module.exports = user;