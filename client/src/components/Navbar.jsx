import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrSearch } from 'react-icons/gr'

 

export default function Navbar() {

    const [displayMenu, setdisplayMenu] = useState(false);

    return (

        <>
            <nav className='py-2 lg:text-base text-2xl md:flex justify-between bg-red-600  text-white lg:h-14 h-[140px]'>
                <div className="logo">Logo</div>

                <div className="search-box-1 lg:w-[25%] w-[60%] bg-white rounded-sm flex justify-between gap-2  lg:h-[90%] h-[60%] my-auto">
                    <input type="text" placeholder='search for your food ' className='w-90% text-black outline-none p-1 px-3' />
                    <GrSearch size={30} style={{margin:"auto"}}/>
                </div>
                <div className=' lg:block hidden'>
                    <ul className="flex gap-6 items-center font-semibold">
                        <li className='nav-link px-2 rounded-sm'>Home</li>
                        <li className='nav-link px-2 rounded-sm'>About</li>
                        <li className='nav-link px-2 rounded-sm'>My orders</li>
                        <img src="/images/user.jpg" className='w-8 h-8 rounded-full' alt="" />

                    </ul>
                </div>
                <div className='lg:hidden  block mr-4 my-auto'>
                    <GiHamburgerMenu size={70} style={{ margin: "auto" }} onClick={()=>setdisplayMenu(!displayMenu)} />
                </div>
            </nav>
            <div className={`mobile-menu sm:text-3xl  text-white text-center font-semibold ${displayMenu?"block":"hidden"} `}>
                <ul className='flex-col gap-7  bg-red-500 p-3'>
                    <li className='py-1 my-2'>Profile</li>
                    <li  className='py-1 my-6'>Home</li>
                    <li className='py-1 my-6'>About</li>
                    <li className='py-1 my-6'>My orders</li>
                </ul>
            </div>

        </>
    )
}
