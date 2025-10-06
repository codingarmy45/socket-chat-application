const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    avatar:{
        type:String,
    },

    isOnline:{
        type:Boolean,
        default: false
    },

    lastSeen:{
        type:Date,
        default: Date.now
    },

    groupAdmin:{
        type:Boolean,
        default:false
    }

    
}, {timestamps:true});

module.exports = mongoose.model('User', userSchema);