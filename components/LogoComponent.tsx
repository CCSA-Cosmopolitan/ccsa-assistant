import React from 'react'
import minilogo from "@/public/ccsa-mini.jpg"
import Image from "next/image";

const LogoComponent = () => {
  return (
    <div className=" flex flex-row bg-green-100 w-full p-2 rounded-md space-x-3">
        <Image src={minilogo} className="h-10 w-10 rounded-full shadow-lg " alt="" />
        <div className=" flex flex-col text-start">
        <h2 className=" font-main font-semibold text-green-900 "> CCSA CUA AI</h2>
        <p className=" text-xs">V1.0</p>
        </div>
    </div>
  )
}

export default LogoComponent