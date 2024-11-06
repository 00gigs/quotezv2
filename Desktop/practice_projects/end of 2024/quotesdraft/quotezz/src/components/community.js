import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
const Community = () => {

  const [communityQuotes,setCommunityQuotes]= useState([])



  const retrieveAll = async ()=>{
    try {
      axios.get('http://localhost:3001/community').then((res)=>{
      setCommunityQuotes(res.data.all)
      }).catch((err)=>{
        console.error(err)
      })
    } catch (error) {
      console.error('err',error)
    }
  }

const isoToDate = (dateConvert) =>{
  const norm = new Date(dateConvert)
  const  logic = (num)=> (num < 10 ? '0' : '') + num 
  const month =logic(norm.getMonth() + 1)
  const days  = logic(norm.getDate())
  const years = logic(norm.getFullYear().toString().slice(-2))
  let hours = norm.getHours()
  hours = hours % 12
  hours = hours ? hours : '12'
  const twelveHour = logic(hours)
  const minutes = logic(norm.getMinutes())
  const ampm = hours >= 12 ? 'AM': 'PM'

  return `${month}/${days}/${years} - ${twelveHour}:${minutes} ${ampm}`
}

  useEffect(() => {
    retrieveAll()
  const intervals = setInterval(retrieveAll,10000)
  console.log(communityQuotes)
  return() => clearInterval(intervals)
  }, [])

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {communityQuotes.length === 0 ? (
        <p>No one here yet, sorry</p>
      ) : (
        communityQuotes.map((value, index) => (
          <ul key={index} className='px-5 rounded-ee-md h-16 flex'>
            <li className='border-blue-500 border-2 m-2 rounded-md bg-blue-200 p-2 h-10 shadow-2xl'>
              <div>
                <p className='text-black'>{value.user_quote}</p>
              </div>
              <div className="my-2 text-[20px] shadow-inner">
                {isoToDate(value.created_at)}
              </div>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}

export default Community
