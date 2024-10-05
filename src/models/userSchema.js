const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:{ type:String, required:true},
    lastName:{ type:String, required:true},
    userName:{ type:String, required:true},
    email:{ type:String, required:true}, 
    password:{ type:String, required:true},
    verified:{ type:Boolean, required:true}
});


const users = mongoose.model(
    'users', userSchema, 'Users');;
module.exports = { users};