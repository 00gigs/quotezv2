'use client'
import { TbBracketsAngleOff } from 'react-icons/tb'
import React from 'react'
import Input from '@/components/UI/input'
import { useState } from 'react'
import Button from '@/components/UI/button'
import Link from 'next/link'

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:outline-1 outline-gray-200'>
      <div className='px-4 py-8 sm:rounded-lg sm:px-10'>
        <div className='md:text-4xl sm:text-2xl mb-5 uppercase w-full text-center flex items-center text-white gap-1 justify-center bg-gray-700 py-4 rounded-md'>
          <h1> CStyleS welcomes all </h1>
          <TbBracketsAngleOff />
        </div>
        <form className='space-y-6 mb-3'>
          <Input type='text' id='name' label='Name' disabled={isSubmitting} />
          <Input type='email' id='email' label='Email' disabled={isSubmitting} />
          <Input type='password' id='password' label='Password' disabled={isSubmitting} />
          <Button type='submit' >CCSign Up</Button>
        </form>
        <Link href={'/sign-in'}>
          <span className='mt-5 hover:underline'>
            Already have an account ? Sign In &#8594;
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
