import React from "react";
import { useState,useContext } from "react";
import {toast} from 'react-toastify';
import './login.css';
import { expenseTracker } from "../ContextAPI/AuthContext";
const Login = () => {
  const {login}=useContext(expenseTracker);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const formHandle=(e)=>{
    console.log(e.target.value);  
    setLoginForm({
        ...loginForm,
        [e.target.name]:e.target.value
    })
  }
  const formSubmission =async(e)=>{
    e.preventDefault();
    console.log(loginForm);
    const result=await login(loginForm);
    if (result.success) {
      toast.success(result.message);
    }else{
      toast.error(result.message);
    }
    setLoginForm({email:"",password:""});
  }
  return (
   
   <div className="d-flex align-items-center justify-content-center vh-100 login-wrapper bg-secondary">
    <form className="border rounded shadow login-overlay p-4 w-md-25" onSubmit={formSubmission}>
        <h1 className="">Login</h1>
        <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={loginForm.email} onChange={formHandle}/>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" id="password" value={loginForm.password} onChange={formHandle}/>
        </div>
        <div className="mb-3 d-grid">
            <button type="submit" className="btn  btn-primary">Login</button>
        </div>
    </form>
   </div>
  );
};

export default Login;
