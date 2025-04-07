import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <header
      className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'
    >
      <div className='Container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          
        </div>

      </div>
    </header>
  )
}

export default Navbar
