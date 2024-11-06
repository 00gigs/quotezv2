import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const Myqoutes = () => {
  const [user_quotes, setUser_quotes] = useState([]);
  const Session = localStorage.getItem("token");
  const nav = useNavigate()

  const checkLogged = () => {
    if(Session){
      console.log('logged')
    }else{
      nav("/Login")
    }
  }
  
  useEffect(() => {
    checkLogged();
  }, []);
  

  const fetch_user = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/userQuotesFetch/${Session}`
      );
      const quotes = res.data.UserQuotes;
      setUser_quotes(quotes);
    } catch (error) {
      console.error('error--->',error)
    }
  };

  const dateNormal = (dateConvert) => {
    const norm = new Date(dateConvert);
    const logic = (num) => (num < 10 ? "0" : "") + num;
    const month = logic(norm.getMonth() + 1);
    const days = logic(norm.getDate());
    const years = logic(norm.getFullYear().toString().slice(-2));
    let hours = norm.getHours();
    hours = hours % 12;
    hours = hours ? hours : "12";
    const twelveHour = logic(hours);
    const minutes = logic(norm.getMinutes());
    const ampm = hours >= 12 ? "AM" : "PM";

    return `${month}/${days}/${years} - ${twelveHour}:${minutes} ${ampm}`;
  };

  const deleteCreated = (qId) => {
    try {
      axios.delete(`http://localhost:3001/deleteUserQuote/${qId}`);
      fetch_user();
    } catch (error) {
      console.error("failed to delete", error);
    }
  };

  useEffect(() => {
    checkLogged()
    fetch_user();
    const intervals = setInterval(fetch_user, 10000);
    return () => clearInterval(intervals);
  }, []);

  if(!Session){
    return null
  }
  return (
    <div className="h-screen  flex-col text-center items-center justify-center">
      <h1 className="mt-[10px]">
        Looks Like You Have Been Doing Some Thinking . . .
      </h1>
      <div className=" my-2">
        <br></br>
        {user_quotes.map((list, index) => (
          <ul className="flex">
            <li
              className=" border-blue-500 border-2 m-4 rounded-md bg-blue-200 p-2 h-10 shadow-2xl"
              key={index}
            >
              <div className="flex items-center">
                <MdDelete
                  onClick={() => deleteCreated(list.id)}
                  className=" hover:scale-105 hover:cursor-pointer mr-1 text-xs bg-red-300 rounded-full"
                ></MdDelete>
                {list.user_quote}
              </div>
              <div className="my-2 text-[20px] shadow-inner">
                {dateNormal(list.created_at)}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Myqoutes;
