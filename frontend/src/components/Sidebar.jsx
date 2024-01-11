import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import icon from '../assets/favicon.png';
import { categories } from '../utils/data';


const isNotActiveStyle = "flex items-center w-full h-18 text-white hover:opacity-80 opacity-50 border-2 border-white transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center w-full h-18 text-white font-bold text-lg opacity-90 border-2 border-white transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-201 hide-scrollbar'>
      <div className="flex flex-col">
        <Link 
          to={"/"}
          className='flex px-3 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className='w-full'/>
          <img src={icon} alt="icon" className='w-10' />
        </Link>
        <div className="flex flex-col font-sans font-semibold">
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle } 
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img 
                src={category.image} 
                className='object-none w-full h-16 shadow-sm'
                alt="category" />
              <div className='absolute px-6'>{category.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile'/>
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar