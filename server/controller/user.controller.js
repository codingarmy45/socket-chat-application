const User = require('../models/user.model.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Signup = async(req,res) =>{
    try{
        const {name, email, password, avatar} = req.body;

        if(!name || !email || !password || !avatar){
            return res.status(500).json({success:false, message:"Please enter all required fields"});
        }

        const user = await User.findOne({email});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(user){
            return res.status(500).json({success:false, message:"User already present"});
        }

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            avatar
        })

        await newUser.save();

        res.status(200).json({success:true, message:"User registered Successfully", newUser});
    }
    catch(err){
        console.log('Error in signup controller', err.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}

const Login = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({success:false, message:"Please enter all required fields"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(500).json({success:false, message:"User not found!!"});
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if(!correctPassword){
        return res.status(500).json({success:false, message:"Email or password is not correct"});
    }

    const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"1D"});

    res.cookie('token', token);

    res.status(200).json({success:false, message:'User login successfully', user});

}

module.exports = {Signup,Login};