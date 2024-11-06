import "./App.css";
import React from "react";
import QuoteBox from "./components/quotebox";
import Navbar from "./components/navbar";
import { Routes, Route } from 'react-router-dom';
import Community from './components/community'
import Create from "./components/create";
import Myqoutes from "./components/myquotes";
import Profile from "./components/profile";
import GoatQuotes from "./components/goatquotes"
import Authpage from "./components/authpage";
import Login from "./components/login";
function App() {
  return (
    <div className="text-black min-h-screen bg-[#f1dfb8d3]">
      <Navbar/>
    <Routes>
      <Route path="/" element={ <QuoteBox />}/>
      <Route path="/forum" element={<Community/>}/>
      <Route path="/quote-creator" element={ <Create />}/>
      <Route path="/my-quotes" element={ <Myqoutes />}/>
      <Route path="/GoatQuotes" element={ <GoatQuotes />}/>
      <Route path="/Profile" element={ <Profile/>}/>
      <Route path="/Authpage" element={ <Authpage/>}/>
      <Route path="/Login" element={<Login/>}/>
    </Routes>
    </div>


  );
}

export default App;
