import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-center items-center gap-4 mb-4 w-full'>
        <NavLink to="/" className='text-white px-4 py-2 bg-blue-300 rounded-lg shadow-md hover:scale-110'>Add New User</NavLink>
        <NavLink to="/retrieve" className='text-white px-4 py-2 bg-blue-300 rounded-lg shadow-md hover:scale-110'>Retrieve Information</NavLink>
    </div>
  )
}

export default Navbar;