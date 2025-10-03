const Chat = require('../models/chat.model.js');
const User = require('../models/user.model.js')

const createChat = async(req,res) =>{
    try{
        let {userId, isGroupChat, users, chatName} = req.body;

        if(!userId && !isGroupChat){
            return res.status(500).json({success:false, message:"User Id is required"})
        }

        if(!isGroupChat){
            const existingChat = await Chat.findOne({
                isGroupChat:false,
                users: {$all:[req.user._id, userId]}
            })

            if(existingChat) return res.status(200).json({success:true, message:"Chat already exists", existingChat})

            const newChat = await Chat.create({
                isGroupChat: false,
                users: [req.user._id, userId]
            });
            return res.status(200).json({success:true, message:'New chat created Successfully', newChat});
        }
        else{
            if(!users || !chatName){
                return res.status(400).json({success:false, message: 'Group chat requires users and name'})
            }

            const newGroupChat = await Chat.create({
                chatName,
                isGroupChat:true,
                users: [...users, req.user._id],
                groupAdmin: req.user._id
            })
            res.status(200).json({success:true, message: 'Group chat crated successfully', newGroupChat})
        }
   
    }
    catch(err){
        console.log('Error in createChat controller: ', err.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

const getUserChats = async(req,res)=>{
    try{
        const chats = await Chat.find({users:req.user._id})
        .populate('users', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1});

        if (!chats) return res.status(404).json({success:false, message: 'Chat not found' });

        res.status(200).json({success:true, message:"Chats fetched successfully", chats});
    }
    catch(err){
        console.log("Error in the getUserChat Controller: ", err.message);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

const getChatById = async(req,res) => {
    try{
        const chat = await Chat.findById(req.params.id)
        .populate('users', '-password')
        .populate('latestMessage');

        if (!chat) return res.status(404).json({success:false, message: 'Chat not found' });

        res.status(200).json({success:true, message:"Chat fetched successfully", chat});
    }
    catch(err){
        console.log("Error in the getChatById controller: ", err.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

module.exports = {createChat,getUserChats,getChatById};