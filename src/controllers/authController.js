const { login, register } = require('../services/userService');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userSchema');
require('dotenv').config();

const authRegister =async(req,res) =>{
  const {firstName,lastName,userName,email,password,confirm} = req.body;
  try{
    if (!firstName || !lastName || !userName || !email || !password || !confirm) {
       return res.status(400).json({ message: "Empty fields" });
    }
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
else{
    const token = await register(firstName,lastName,userName,email,password);
    return  res.status(201).json({ token });
    }
  }catch(error){
    if(error.message === "User with given email already Exist!"){
      return res.status(409).json({ message: error.message });
    }else{
      return  res.status(400).json({ message: error.message });
    }
  }
}


const authLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Empty fields" });
    }

    const token = await login(email, password);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error.message === "Invalid Email" || error.message === "Invalid Password") {
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};


// Verifying the email using the token
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

  
    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {

      // Delete the user if token expire
      const decoded = jwt.decode(token);
      console.log()
      await users.findByIdAndDelete(decoded.id);

      return res.status(400).json({ message: "Verification link expired. User deleted." });
    } else {
      return res.status(400).json({ message: "Email verification failed!" });
    }
  }
};

module.exports = { authRegister, authLogin, verifyEmail };
