import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import Search from "./search";
import toast, { Toaster } from 'react-hot-toast';

// import { useEffect } from "react";
import axios from "axios";
const QuoteBox = () => {
  //const/variables
  const [quote, setQuote] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const user_token = localStorage.getItem('token')

  const notify = () => toast('Please Log in to Save quotes and cast votes');
  const notify2 = () => toast('Please shake dice before Saving or voting');
  const notifySave = () => toast('Quote Saved !');

  //random quote handle
  const genRandomQuote = async () => {
    const res = await fetch("http://localhost:3001/randomQuote");
    const quoteData = await res.json();
    setQuote(quoteData);
    fetchVotes()
  };

//vote handles
  const handleLike = async () => {
    if(user_token){
      axios
        .post(`http://localhost:3001/like/${quote.id}`)
        .then((res) => { setLikes(res.data.likes)}).catch((error)=>{console.error('Err',error)});
    }else{
      notify()
    }
  };
  const handleDislike = async () => {
    if(user_token){
      axios
      .post(`http://localhost:3001/dislike/${quote.id}`)
      .then((res) => { setDislikes(res.data.dislikes)}).catch((error)=>{console.error('Err',error)})
    }else{
      notify()
    }
  };


  const fetchVotes = () =>{
 try {
      const res = axios.get(`http://localhost:3001/votes/${quote.id}`)
       setDislikes(res.data.dislikes || 0)
       setLikes(res.data.likes || 0)
 } catch (error) {
    console.log('failed fetching votes ',error)
    setDislikes(0)
    setLikes(0)
 }
  }



  // Save quote handle
  const handleSave = async() =>{
  try {
    axios.post(`http://localhost:3001/saveQuote?_quote_=${quote.id}&user=${user_token}`).then((res)=>{
   notifySave()
    }).catch((err)=>{
      console.error('err',err)
      notify()
    })
  } catch (error) {
    notify2()
    console.log('error posting favoirte',error)
  }
  }
  //render
  return (
    <div className="h-screen flex text-center items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Search */}
        <Search />
        {/* Quote content */}
        <div className="bg-[#e6f4f2be] shadow-2xl border-2 border-white p-5 rounded-lg">
          {/* Main content */}
          <div className=" space-y-2">
            <p className="text-[22px]">
              💬{quote ? quote.quote : "Click the dice to generate quote"}
            </p>
            <p className="italic">✍️by {quote ? quote.author : "Author"}</p>
            <p className="italic">📚 {quote ? quote.category : "category"}</p>
          </div>
          {/* Votes */}
          <div className="mt-4 flex justify-center space-x-14">
            <div className="flex flex-col items-center">
              <button onClick={handleSave}>
                <FaPlusCircle className="w-4 h-4  hover:scale-125" />
              </button>
              <p className="text-center">save </p>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={handleLike}>
                <FaArrowCircleUp className="w-5 bg-green-600 rounded-full  hover:scale-125" />
                <span>{likes}</span>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={handleDislike}>
                <FaArrowCircleDown className="w-5 bg-red-600 rounded-full  hover:scale-125" />
                <span>{dislikes}</span>
              </button>
            </div>
            <div className="flex items-center">
              <button>
                <GiPerspectiveDiceSixFacesRandom
                  className="w-7 h-7 hover:scale-125"
                  onClick={genRandomQuote}
                />
              </button>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;
