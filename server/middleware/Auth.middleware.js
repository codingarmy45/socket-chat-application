const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
require('dotenv').config();

const UserAuth = async(req,res, next) =>{
    try{
        const {token} = req.cookies;
        const userID = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(userID);
        if(!user){
            res.status(501).json({success:false, message:"Unauthorized Access Denied"})
        } 
        req.user = user;

        next();
    }
    catch(err){
        console.log('Error in Auth middleware: ', err.message);
        res.status(501).json({success:false, message:"Unauthorized Access Denied"})
    }
}

module.exports = UserAuth;