import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className='bg-stone-900 flex justify-between p-[10px_30px] gap-10'>
       
        <Link to="/" className='text-xl font-bold text-white hover:text-blue-400'>
          STUDOSE
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
