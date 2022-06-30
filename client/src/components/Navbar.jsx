import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Navbar() {

    const [displayMenu, setdisplayMenu] = useState(false);

    return (

        <>
            <nav className='py-1 md:flex justify-between bg-red-600  text-white'>
                <div className="logo">Logo</div>

                <div className="search-box-1 w-[25%] px-1 bg-white rounded-sm">
                    <input type="text" placeholder='search for your food ' className='w-80% p-1 px-4' />
                    <i data-feather="search"></i>
                </div>
                <div className=' lg:block hidden'>
                    <ul className="flex gap-6 items-center">
                        <li className='nav-link px-2 rounded-sm'>Home</li>
                        <li className='nav-link px-2 rounded-sm'>About</li>
                        <li className='nav-link px-2 rounded-sm'>My orders</li>
                        <img src="/images/user.jpg" className='w-8 h-8 rounded-full' alt="" />

                    </ul>
                </div>
                <div className='lg:hidden  block mr-4'>
                    <GiHamburgerMenu size={25} style={{ margin: "auto" }} onClick={()=>setdisplayMenu(!displayMenu)} />
                </div>
            </nav>
            <div className={`mobile-menu  text-white text-center font-semibold ${displayMenu?"block":"hidden"} `}>
                <ul className='flex-col gap-7  bg-red-500 p-3'>
                    <li className='py-1'>Profile</li>
                    <li  className='py-1'>Home</li>
                    <li className='py-1'>About</li>
                    <li className='py-1'>My orders</li>
                </ul>
            </div>

        </>
    )
}
