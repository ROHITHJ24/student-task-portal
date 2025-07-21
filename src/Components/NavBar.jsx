import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
      <nav className='bg-stone-900 flex justify-between p-[10px_30px] gap-10'>
        <h1 className='text-xl font-bold text-white '>STUDOSE</h1>
<div className="signup-login gap-2 flex bg-white rounded-md p-[5px_10px] item-center">

        <Link to={'login'}>Login</Link>|<Link to={'signup'}>Sign-up</Link>
</div>
      </nav>
    </div>
  )
}

export default NavBar
