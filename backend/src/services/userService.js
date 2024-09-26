const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async(email,password)=>{
    try{
        let user = await Users.findOne({email});
        //let user = "s@gmail.com";
        console.log(user);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const validPassword = await bcrypt.compare(password, user.password/*"$2a$10$EwkdLYDIL7.4mDmH5MQJqOF7Z7ciAfyJafgw3v7jXVVPw2vOSKeMm"*/ );
       
        if(!validPassword){
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error Occured');
    }

}
  module.exports = {login};