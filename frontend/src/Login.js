import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {Swal} from 'sweetalert2'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/UpdateInfo");
    }
  });

  const handleLogin = async () => {
    console.warn(email, password, role);
    try {
      let result = await fetch("http://localhost:8000/Login", {
        method: 'post',
        body: JSON.stringify({ email, password, role }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!result.ok) {
        throw new Error('Failed to login');
      }
      result = await result.json();
      console.warn(result);
      if (result.email) {
        localStorage.setItem("user", JSON.stringify(result));
        if (role === 'employee') {
          navigate("/Register"); // Redirect to Register.js page
        } else if (role === 'goshalas') {
          navigate("/UpdateInfo", { state: { user: result } }); // Redirect to UpdateInfo.js page
        } else if (role==="admin") {
          navigate("/EmployeeRecords"); // Or any other default page
        }
      } else {
        alert("Please enter correct details");
      }
    } catch (error) {
      console.error('Error logging in:', error);
     
      
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className='selectBox'>
        <option value="select">Select</option>
        <option value="admin">Admin</option>
        <option value="goshalas">Goshalas</option>
        <option value="employee">Employee</option>
      </select>

      <input className='inputBox' type="text" placeholder="Enter Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='inputBox' type="password" placeholder="Enter password"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='appButton' type="button" onClick={handleLogin}>Login</button>

    </div>
  );
}

export default Login;
