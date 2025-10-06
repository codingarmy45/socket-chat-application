// src/pages/ChatDashboard.jsx
import React from 'react';
import useChatStore from '../store/useChatStore';
import axios from 'axios'
import { useEffect } from 'react';
const ChatDashboard = () => {
  const { chats, setChats, selectedChat, setSelectedChat } = useChatStore();

  const fetchChat = async() => {
    try{
      const res = await axios.get('https://studious-lamp-px5qv9gjjv9hjwq-4000.app.github.dev/api/chat', {withCredentials:true});
      setChats(res.data.chats) 
    }
    catch(err){
      console.log(err.message);
    }
  }

  const postChat = async() =>{
    try{
      const res = await axios.post('https://studious-lamp-px5qv9gjjv9hjwq-4000.app.github.dev/api/chat', selectedChat, {withCredentials:true})
      console.log("postChat: ", res);
    }
    catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    fetchChat();
  },[])

  useEffect(()=>{
    postChat();
    console.log(selectedChat);
  },[selectedChat])

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`p-3 rounded cursor-pointer mb-2 ${
              selectedChat?._id === chat._id ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.isGroupChat ? chat.chatName : chat.users[0].name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white">
          <h2 className="text-lg font-bold">
            {selectedChat ? (selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[0].name) : 'Select a chat'}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {/* Messages will go here */}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded px-4 py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
