import React from 'react'
import { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrSearch } from 'react-icons/gr'
import { Link, Navigate, useNavigate } from "react-router-dom";



export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [displayMenu, setdisplayMenu] = useState(false);
    const [user, setuser] = useState({});
    const handleLogout = () => {

        localStorage.removeItem("userInfo");
        navigate('/user/login')
    }
    useEffect(() => {


        if (localStorage.getItem('userInfo')) {
            setisLoggedIn(true);
            setuser(JSON.parse(localStorage.getItem('userInfo')))

        } else {
            setisLoggedIn(false);
            console.log(isLoggedIn);
        }


    }, [localStorage]);
    return (

        <>
            <nav className='py-2 lg:text-base text-2xl md:flex justify-between bg-red-600  text-white lg:h-14 h-[140px]'>
                <div className="logo">Logo</div>

                <div className=' lg:block hidden'>
                    <ul className="flex gap-6 items-center font-semibold">
                        <li className='nav-link px-2 rounded-sm'><Link to='/'>Home</Link></li>
                        <li className='nav-link px-2 rounded-sm'>About</li>
                        <li className='nav-link px-2 rounded-sm' ><Link to='/user/outpass'>My Outpasses</Link></li>
                        <li className="nav-item dropdown profile">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="text">profile</span>
                            </a>
                            <ul
                                className="dropdown-menu p-2 dropdown_menu"
                                aria-labelledby="navbarDropdownMenuLink">
                                <li className="ml-2 profile-name" >
                                    <p className="text-white ms-2">{user.name}</p>
                                </li>
                                <li>
                                    <button className="dropdown-item .logout" onClick={handleLogout}>
                                        {isLoggedIn ? "Log out" : "Log in"}
                                    </button>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <div className='lg:hidden  block mr-4 my-auto'>
                    <GiHamburgerMenu size={70} style={{ margin: "auto" }} onClick={() => setdisplayMenu(!displayMenu)} />
                </div>
            </nav>
            <div className={`mobile-menu sm:text-3xl  text-white text-center font-semibold ${displayMenu ? "block" : "hidden"} `}>
                <ul className='flex-col gap-7  bg-red-500 p-3'>
                    <li className='py-1 my-2'>Profile</li>
                    <li className='py-1 my-6'>Home</li>
                    <li className='py-1 my-6'>About</li>
                    <li className='py-1 my-6'>My orders</li>
                </ul>
            </div>

        </>
    )
}
