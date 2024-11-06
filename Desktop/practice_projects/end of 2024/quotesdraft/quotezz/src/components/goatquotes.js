import React from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";

const GoatQuotes = () => {



const [topQuotes,setTopQuotes] = useState([])
const [topTrend,setTopTrend] = useState([])

  const getTopQ = async () =>{
  try {
   const res = await axios.get('http://localhost:3001/rankedQuotes')
   setTopQuotes(res.data.topQ)
   setTopTrend(res.data.trending)
  } catch (error) {
    console.error('error')
  }
}


useEffect(() => {
const interval = setInterval(getTopQ,500)
return() => clearInterval(interval)
}, [])
  return (
    <div className=" text-center mt-4 h-screen">
      <div className="mb-1">Most Popular</div>{topQuotes.length > 0 ? (
        topQuotes.map((value,index)=>(
          <ul key={index} className="border-blue-500 border-2 m-4 rounded-md bg-blue-200 p-2 flex shadow-2xl">
            <li className="text-md m-4 items-center text-center flex ">
             {value.quote} 
            </li>
          </ul>
        ))
      ) : <p className="font-thin my-1 italic text-sm">😱...'no rankings'</p>}

      <div className="mb-1">Top Trending</div>{topTrend.length > 0 ? (
        topTrend.map((value,index)=>(
          <ul key={index} className="border-blue-500 border-2 m-4 rounded-md bg-blue-200 p-2 justify-center flex shadow-2xl">
            <li className="text-md m-4 items-center text-center flex">
            #{index.valueOf()+1}- {value.quote}
            </li>
          </ul>
        ))
      ):<p className=" font-thin my-1 italic text-sm">😱...'no rankings'</p>}
      <div className="mb-1">Most Quoted Author</div>{topQuotes.length > 0 ? (
        topQuotes.map((value,index)=>(
          <ul key={index} className="border-blue-500 border-2 m-4 rounded-md bg-blue-200 p-2 justify-center flex shadow-2xl">
            <li className="text-md m-4 items-center text-center flex">
            {value.author}
            </li>
          </ul>
        ))
      ):<p className=" font-thin my-1 italic text-sm">😱...'no rankings'</p>}
    </div>
  );
};

export default GoatQuotes;
