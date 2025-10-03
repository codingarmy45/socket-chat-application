const Message = require('../models/message.model.js')
const Chat = require('../models/chat.model.js')

const sendMessage = async(req,res) =>{
    try{
        const {chatId, content} = req.body;

        if(!chatId || !content){
            return res.status(400).json({success:false, message: 'Chat ID and content are required' });
        }

        const newMessage = await Message.create({
            sender:req.user._id,
            content,
            chat:chatId
        });

        await Chat.findByIdAndUpdate(chatId, {latestMessage:newMessage._id});

        const populateMessage = await newMessage.populate([
            {path: 'sender', select:'name email'},
            {path:'chat'},
        ])

        res.status(200).json({success:true, message:"Message Send Successfully", populateMessage});
    }
    catch(err){
        console.log('Error in the sendMessage Controller: ', err.message)
        res.status(500).json({success:false, messag:"Internal server error"});
    }
}

const getMessagesForChat = async(req,res) =>{
    try{
        const messages = await Message.find({chat:req.params.chatId})
        .populate('sender', 'name email')
        .populate('chat')
        
        if(!messages){
        return res.status(500).json({success:false, message:'No message found'});
        }

        res.status(200).json({success:true, message:"Message fetched successfully", messages});
    }
    
    catch(err){
        console.log("Error in the getMessagesForChat controller: ", err.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}
module.exports = {sendMessage, getMessagesForChat};