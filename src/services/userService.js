const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userSchema');
const { sendVerificationEmail } = require('../services/emailService');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async(firstName,lastName,userName,email,password)=>{
    try{
        const userExist = await users.findOne({email})
        if(userExist){
            throw new Error('User with given email already Exist!');
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new users({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
	        verified: false 
        });
	    await sendVerificationEmail(newUser);
        await newUser.save();
        console.log("User successfully registered and verification email sent");
        const token = jwt.sign({ id: newUser._id},'JWT_SECRET', { expiresIn: '1h' 	
});
     return token;   
    }catch(error){
        throw new Error(error.message || 'Error occurred during registration.');
    }
};

const login = async(email,password)=>{
    try{
        let user = await users.findOne({email});
        if (!user) {
            throw new Error('Invalid Email');
        }
        const validPassword = await bcrypt.compare(password, user.password);  
        if(!validPassword){
            throw new Error('Invalid Password');
        }
    if (!user.verified) {
        throw new Error('Please verify your email to log in.');
    }
        const token = jwt.sign({id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error occurred during login.');
    }
}
  module.exports = {login,register};