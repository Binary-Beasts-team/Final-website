import "../css/signup.css";
import {useRef,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {
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
    const handleLogin = ()=>{
        navigate('/user/login');
    }
    // Submitted Email-Password
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    
    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
    }

    const postSignupData = async () => {
        const { userName, email, password, confirmPassword } = userSignupInfo;
        
        if (!email || !password || !confirmPassword) {
            console.log("fill all the fields before sign up!!");
            return;
        }
    
        if (password != confirmPassword) {
            console.log("Confirm Password doesn't Matches");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3001/api/users/",
                {
                    userName,
                    email,
                    password,
                });
    
            if (res) {
            console.log(res);
            console.log("sent the verification email to your registered email address !!");
            setuserSignupInfo({
                userName:"Brij",
                email: "",
                password: "",
                confirmPassword: "",
                });
            }
        } catch (error) {
            console.log("error in sign in!", error.message); 
        }
    };

    return (
        <div className="signup">
            <div className="signupWrapper">
                <div className="signupLeft">
                    <h1 className="signupLogo">Zomato</h1>
                    <span className="signupDesc">Sign Up to Zomato and Order Your Favourite Food!</span>
                </div>
                <div className="signupRight">
                    <form className="signupBox" onSubmit={handleSubmit}>
                        <input type="email" required placeholder="Email" className="signupInput" ref={email} name="email" value={userSignupInfo.email} onChange={handleSignupChange}/>
                        <input type="password" required placeholder="Password" className="signupInput" ref={password} name="password" value={userSignupInfo.password} onChange={handleSignupChange}/>
                        <input type="password" required placeholder="Re-Enter Password" className="signupInput" ref={rePassword} name="confirmPassword" value={userSignupInfo.confirmPassword} onChange={handleSignupChange}/>
                        <button className="signupBtn" onClick={postSignupData}>Sign Up</button>
                        <div className="loginOptions">
                            <button className="googleBtn">  Google</button>
                            <button className="fbBtn"> Facebook</button>
                            <button className="githubBtn"> GitHub</button>
                        </div>

                        <hr className="hr"/>
                        <span className="newText">Already have an account?</span>
                        <button className="logInBtn" onClick={handleLogin}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;