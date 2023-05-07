const mongoose = require('mongoose')
const { Schema } = mongoose

//for student login
const userSchema = new Schema({
    name: String,
    USN: {
        type:String,
        unique:true
    },
    password: String,

})


//for faculty login

const userSchema1 = new Schema({
    name:String,
    employeeID:{
        type:String,
        unique:true
    },
    password:String,
})


const UserModel = mongoose.model('User', userSchema);
const UserModel1 = mongoose.model('User1', userSchema1);
module.exports = {UserModel, UserModel1};