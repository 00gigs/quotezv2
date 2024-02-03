'use client'

import React, { Children } from "react"
import { useFormStatus } from "react-dom"
interface ButtonProps {
    type?: "button" | "submit" | "reset" ;
    Children:React.ReactNode
    onClick?:React.MouseEventHandler<HTMLButtonElement>
    disabled?:boolean
    
}

const Button:React.FC <ButtonProps> = ({
    type,
    Children,
    onClick,
    disabled,
}) =>{
    const {pending} = useFormStatus()

    return(
        <button className="bg-gray-700 text-white py-1 px-3 shadow rounded-md" disabled={disabled} onClick={onClick} type={type} aria-disabled={pending} >
            {Children}
        </button>
    )
}

export default Button