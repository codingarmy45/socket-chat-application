import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import {Routes, Route, Link} from 'react-router-dom'
import Chat from './pages/ChatDashboard'
const App = () => {
  return (
    <div>
      <div style={{display:"flex", gap:"5px"}}>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
        <Link to='/'>Home</Link>
        <Link to='/chat'>Chat</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  )
}

export default App
