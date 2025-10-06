import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
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
      const res = await axios.post('https://studious-lamp-px5qv9gjjv9hjwq-4000.app.github.dev/api/signup', formData, { withCredentials: true });
      console.log(res);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="userName" onChange={changeHandler} required />
      </div>

      <div>
        <label htmlFor="name">Email: </label>
        <input type="email" name="email" onChange={changeHandler} required />
      </div>

      <div>
        <label htmlFor="name">Password: </label>
        <input type="password" name="password" onChange={changeHandler} required />
      </div>

      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
  )
}

export default Signup
