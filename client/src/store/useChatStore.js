import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useChatStore = create(
    persist(
    (set) =>({
    user:null,
    setUser: (userData) => set({user: userData}),

    chats: [],
    setChats: (chatList) => set({chats: chatList}),

    selectedChat: null,
    setSelectedChat: (chat) => set({selectedChat: chat}),

    messages: [],
    setMessage: (msgs) => set({messages: msgs}),

    typing: false,
    setTyping: (status) => set({typing: status}),
}),
{
    name: 'chat-store',
    partialize: (state)=>({user:state.user})
}
))

export default useChatStore;