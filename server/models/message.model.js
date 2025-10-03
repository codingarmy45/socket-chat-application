const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },

    content:{
        type:String,
        required:true,
    },

    chat:{
        type:mongoose.Types.ObjectId,
        ref:'Chat'
    },

    // messageType:{
    //     type:String,
    //     required:true
    // }
}, {timestamps:true});

module.exports = mongoose.model('Message', messageSchema);