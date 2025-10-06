import React from 'react'
import useChatStore from '../store/useChatStore'
const Home = () => {
    const {user} = useChatStore();
    return (
    <div>
      {user.email}
    </div>
  )
}

export default Home
