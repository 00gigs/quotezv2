import React from 'react'
import { navLinks } from '../constants/navlinks'
const Navbar = () => {
  return (
    <div className=' shadow-2xl flex sticky justify-center text-center bg-[#98cececc] h-9 items-center border-b-2 border-black sm:h-[60px]'>
      <ul className='flex  justify-center items-center'>
      {navLinks.map((link)=>(
        <a className=' px-0  sm:px-[7px]' href={link.route}>
          <li className='text-[10.5px] shadow-2xl border-l-2  border-r-2  font-serif text-center  bg-blue-200  rounded-xl px-2  border-black hover:bg-blue-400 hover:scale-y-150 sm:text-[15px]'>{link.label}</li>
        </a>
      ))}
      </ul>
    </div>
  )
}

export default Navbar
