
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";



/**render name field  based on if signup is true */

const Login = () => {

  const [userEmail,setUserEmail] = useState('')   
  const [userPassword,setUserPassword] = useState('')   

    const nav =  useNavigate()


    const authAction = async (e)=>{
        e.preventDefault()
console.log('Attempting Login endpoint')
if(!userEmail||!userPassword){
  alert('Please fill all fields')}
  else{
    const res = await fetch('http://localhost:3001/signIn',{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({userEmail,userPassword})
    });
    if(!res.ok){
      throw new Error("Failed user Login ");
    }else{
      const token = await res.json()
      localStorage.setItem('token',token.userToken)
      console.log('login success',)
      
      nav("/")
    }
  }

    }
    const Signup = (e)=>{
        e.preventDefault()
    nav("/Authpage")
    }

   
  return (
    <div className="min-h-screen flex text-center  justify-center ">
      <div className="bg-green-200  w-screen p-4 sm:w-[650px]">
        <h1 className=" mt-36">Welcome Back !</h1>
        <h1>Login below</h1>
        <form className="bg-[#d4e0a9c4] border-2  border-black grid-cols-1 space-y-11 p-6 mt-4">
          <div>
            <label className="underline">
              Email
              <input
                className="border-black border-2 ml-3 rounded-lg bg-transparent"
                type="email"
                name="userEmail"
                required
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="underline">
              Password
              <input
                className="border-black border-2 mr-7 ml-3 rounded-lg bg-transparent"
                type="password"
                name="password"
                value={userPassword}
                required
                onChange={e => setUserPassword(e.target.value)}
              />
            </label>
          </div>
          <div className=" space-x-5">
          <button className="bg-green-500 px-4 rounded-lg hover:bg-green-300" onClick={authAction}>Login</button>
          <button className="bg-green-500 px-4 rounded-lg hover:bg-green-300" onClick={Signup}>SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
