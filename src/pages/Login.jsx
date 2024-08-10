import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return toast.warning(`malumotni toliq kiriting`);
    }
    let user = {
      username,
      password,
    };
    axios
      .post(`https://fakestoreapi.com/auth/login`, user)
      .then((res) => {
        toast.success(`welcome`);
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("username or passwork is incorrect");
      });
    console.log(user);
  };
  return (
    <div className="form2 container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username*</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          required
        />
        <button type="submit">Login</button>
        <button className="btn3">Signup?</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
