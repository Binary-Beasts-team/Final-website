import "../css/signup.css";
import { useRef, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [checkValue, setcheckValue] = useState("student");



    const handleSignupChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setuserSignupInfo({ ...userSignupInfo, [name]: val });
    };

    const handleGoogleOnClick = () => {
        window.location = '/auth/google'
    }
    const handleSubmit = (e) => {
        e.preventDefault();         //prevents reloading page on Submit
    }

    const postSignupData = async () => {
        const { name, email, password, confirmPassword } = userSignupInfo;

        if (!email || !password || !confirmPassword) {
            toast.error("fill all the fields before sign up!!")
            return;
        }
        if (password != confirmPassword) {
            toast.error("Confirm Password doesn't Matches")
            return;
        }
        const loadToast = toast.loading("signing up.. wait!!")
        try {
            
            const res = await axios.post(
                `/api/${checkValue}/`,
                {
                    name,
                    email,
                    password 
                    
                });

            toast.dismiss(loadToast);

            if (res) {

                toast.success("sent the verification email to your registered email address !!");
                console.log("sent the verification email to your registered email address !!");
                setuserSignupInfo({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }
        } catch (error) {
            toast.dismiss(loadToast);

            toast.error("something went wrong cheack your internet connection!!")
        }
    };

    const handleCheckbox = (e) => {

        if (e.target.checked) {
            setcheckValue("student");
        } else {
            setcheckValue("faculty")
        }
    } 

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
                        <input type="text" required placeholder="name" className="signupInput"  name="name" value={userSignupInfo.name} onChange={handleSignupChange} />

                            <input type="email" required placeholder="Email" className="signupInput" ref={email} name="email" value={userSignupInfo.email} onChange={handleSignupChange} />
                            <input type="password" required placeholder="Password" className="signupInput" ref={password} name="password" value={userSignupInfo.password} onChange={handleSignupChange} />
                            <input type="password" required placeholder="Re-Enter Password" className="signupInput" ref={rePassword} name="confirmPassword" value={userSignupInfo.confirmPassword} onChange={handleSignupChange} />
                            <button className="signupBtn" onClick={postSignupData}>Sign Up</button>
                            <div className="flex my-1 p-1 gap-4 border items-center cursor-pointer" onClick={handleGoogleOnClick}>
                                <FcGoogle size={30} />
                                <p className="text-left">sign  up with google</p>
                            </div>
                            <div>
                                <label htmlFor="checkbox" className="mx-3">Are you a student?</label>
                                <input type="checkbox" name="checkbox" id="checkbox" onChange={handleCheckbox} />
                            </div>

                            <hr className="hr" />
                            <Link to="/user/login">
                                <span className="newText text-blue-600 ml-3 p-1">Already have an account? Log in</span>
                            </Link>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Signup;