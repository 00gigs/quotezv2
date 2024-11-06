import React from "react";
import { FaSearchengin } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [queryy, setQueryy] = useState("");
const [similarQuotes, setSimilarQuotes] = useState([])
  const sendInput = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/searchQuery?queryI=${encodeURIComponent(queryy)}`)
      .then((response) => {
        console.log("req/res_Data", response.data.messageJson);
        setQueryy('')
        setSimilarQuotes(response.data.messageJson)
        console.log("SimilarQuotes", similarQuotes);
      })
      .catch((error) => {
        console.error("error retrieving inout-->", error);
      });
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center space-x-1">
      {/**search  */}
      <form onSubmit={sendInput} className="text-center items-center">
        <button type='submit'>
          <FaSearchengin className=" w-7 h-7 mx-1 hover:scale-110" />
        </button>
        <input
          type="text"
          name="searchResult"
          onChange={(e) => setQueryy(e.target.value)}
          value={queryy}
          className="bg-white border-4  rounded-xl "
          />
          <h1 className="mt-1 text-[20px] tracking-widest font-thin font-serif text-gray-500">Type to search mood , genre, author or find quote recommendations</h1>
          <div className=" w-full max-w-md p-4 rounded-lg">
          {similarQuotes.map((value,index)=>(
            <ul key={index}>
              <li className="text-xs border-b-8 font-semibold tracking-wide pb-1">'{value.quote}'</li>
            </ul>
          ))}
          </div>
      </form>
    </div>
  );
};

export default Search;
