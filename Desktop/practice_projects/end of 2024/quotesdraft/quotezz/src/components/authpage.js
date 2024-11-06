import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

  /**render name field  based on if signup is true */


const Authpage = () => {
  //change url function  VVVV
  const nav = useNavigate();

  //states  vvvv
  const [email, setEmail] = useState("");
  const [name_user, setName_user] = useState("");
  const [password, setPassword] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //forum submission   vvvv
  const authAction = async (e) => {
    e.preventDefault();
    console.log("attempting Signup endpoint");
    if (!email || !name_user || !password) {
      alert("please complete all fields ");
    }else if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
    }else {
      const res = await fetch("http://localhost:3001/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, name_user, password}),
      });
      if (!res.ok) {
         alert("please complete all fields correctly ");
        throw new Error("Failed to register user");
      } else {
        console.log("Register success");
        nav("/Login");
      }
    }
  };

  //switch to log in page vvvv
  const userLogin = (e) => {
    e.preventDefault();
    nav("/Login");
  };

  return (
    <div className="h-screen flex text-center  justify-center ">
      <div className="bg-green-200  w-screen p-4 sm:w-[650px]">
        <h1 className=" mt-36">Welcome</h1>
        <h1>Please Sign-Up below</h1>
        <form className="bg-[#d4e0a9c4] border-2  border-black grid-cols-1 space-y-11 p-6 mt-4">
          <div className="grid">
            <label className="underline">
              Email
              <input
                className="border-black border-2 ml-3  rounded-lg bg-transparent"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="gird">
            <label className="underline">
              Name
              <input
                className="border-black border-2 ml-3  rounded-lg bg-transparent"
                type="text"
                onChange={(e) => setName_user(e.target.value)}
              />
            </label>
          </div>
          <div className="gird">
            <label className="underline mr-6">
              Password
              <input
                className="border-black border-2 ml-3  rounded-lg bg-transparent"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className=" space-x-5">
            <button
              className="bg-green-500 px-4 rounded-lg hover:bg-green-300"
              onClick={userLogin}
            >
              Login
            </button>
            <button
              className="bg-green-500 px-4 rounded-lg hover:bg-green-300"
              onClick={authAction}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authpage;
