import React from 'react'
import {logo } from '../assets'

const Footer = () => {
  return (
    <div className='w-full flex mt-4 bg-slate-400 p-3'>
       <img className='w-32 mx-auto justify-center items-center' src={logo} alt="logo" />
    </div>
  )
}

export default Footer