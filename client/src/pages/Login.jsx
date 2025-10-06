import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useChatStore from '../store/useChatStore'

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useChatStore();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://studious-lamp-px5qv9gjjv9hjwq-4000.app.github.dev/api/login', formData, { withCredentials: true });
      const storedUser = res.data.user;
      if(storedUser) setUser(storedUser)
      navigate('/')
      console.log(res);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form onSubmit={submitHandler}>

      <div>
        <label htmlFor="name">Email: </label>
        <input type="email" name="email" onChange={changeHandler} required />
      </div>

      <div>
        <label htmlFor="name">Password: </label>
        <input type="password" name="password" onChange={changeHandler} required />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default Login
