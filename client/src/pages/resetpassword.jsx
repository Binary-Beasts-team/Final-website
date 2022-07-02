import React from 'react'
import { useRef, useState } from "react";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import queryString from "query-string";


const Resetpassword = () => {
    const password = useRef();
    const rePassword = useRef();
    const { search } = useLocation();
    const navigate = useNavigate();
    const { userId, token } = queryString.parse(search);
    const [userInfo, setuserInfo] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setuserInfo({ ...userInfo, [name]: val });
    };

    const postforgotpassword = async () => {
        const { password, confirmPassword } = userInfo;

        if (!password || !confirmPassword) {
            toast.error("fill all the fields before sign up!!")
            return;
        }
        if (password != confirmPassword) {
            toast.error("Confirm Password doesn't Matches")
            return;
        }
        try {
            const loadToast = toast.loading("Updating Info.. wait!!")
            const res = await axios.put(
                `/api/auth/mailoptions/resetpassword/${userId}/${token}`,
                {
                    password,
                });

            toast.dismiss(loadToast);

            if (res) {

                toast.success("Password successfully changed");
                console.log("Password successfully changed");
                navigate('/')
            }
        } catch (error) {
            toast.error("something went wrong cheack your internet connection!!")
        }
    };

  return (
    <>
        <div>
        <input type="password" required placeholder="Password" className="signupInput" ref={password} name="password" value={userInfo.password} onChange={handleChange} />
        <input type="password" required placeholder="Re-Enter Password" className="signupInput" ref={rePassword} name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} />
        <button className="signupBtn" onClick={postforgotpassword}>Confirm</button>
        </div>
    </>
  )
}

export default Resetpassword