import "../css/signup.css";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc'
import { GrFacebook } from 'react-icons/gr'


function Signup() {
    // Submitted Email-Password
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const navigate = useNavigate();
    const [userSignupInfo, setuserSignupInfo] = useState({
        userName: "Brij",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignupChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setuserSignupInfo({ ...userSignupInfo, [name]: val });
    };
    const handleLogin = () => {
        navigate('/user/login');
    }
    const handleGoogleOnClick = () => {
        window.location = '/auth/google'
    }
    const handleSubmit = (e) => {
        e.preventDefault();         //prevents reloading page on Submit
    }

    const postSignupData = async () => {
        const { userName, email, password, confirmPassword } = userSignupInfo;

        if (!email || !password || !confirmPassword) {
            toast.error("fill all the fields before sign up!!")
            return;
        }
        if (password != confirmPassword) {
            toast.error("Confirm Password doesn't Matches")
            return;
        }
        try {
            const loadToast = toast.loading("signing up.. wait!!")
            const res = await axios.post(
                "/api/student/",
                {
                    userName,
                    email,
                    password,
                });

            toast.dismiss(loadToast);

            if (res) {

                toast.success("sent the verification email to your registered email address !!");
                console.log("sent the verification email to your registered email address !!");
                setuserSignupInfo({
                    userName: "Brij",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }
        } catch (error) {
            toast.error("something went wrong cheack your internet connection!!")
        }
    };

    return (
        <>
            <div className="signup">
                <div className="signupWrapper">
                    <div className="signupLeft">
                        <h1 className="signupLogo">Zomato</h1>
                        <span className="signupDesc">Sign Up to Zomato and Order Your Favourite Food!</span>
                    </div>
                    <div className="signupRight">
                        <form className="signupBox flex-col gap-2" onSubmit={handleSubmit}>
                            <input type="email" required placeholder="Email" className="signupInput" ref={email} name="email" value={userSignupInfo.email} onChange={handleSignupChange} />
                            <input type="password" required placeholder="Password" className="signupInput" ref={password} name="password" value={userSignupInfo.password} onChange={handleSignupChange} />
                            <input type="password" required placeholder="Re-Enter Password" className="signupInput" ref={rePassword} name="confirmPassword" value={userSignupInfo.confirmPassword} onChange={handleSignupChange} />
                            <button className="signupBtn" onClick={postSignupData}>Sign Up</button>
                            <div className="loginOptions">
                                <button className="googleBtn" onClick={handleGoogleOnClick}>  Google</button>
                            </div>

                            <hr className="hr" />
                            <span className="newText">Already have an account?</span>
                            <button className="logInBtn" onClick={handleLogin}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default Signup;