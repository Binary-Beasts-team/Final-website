import "../css/login.css";
import {useRef,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



function Login() {

    const navigate = useNavigate();
    const [userLoginInfo, setuserLoginInfo] = useState({
        email: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
    
        setuserLoginInfo({ ...userLoginInfo, [name]: val });
    };
    
     // Submitted Email-Password
    const email = useRef();
    const password = useRef();

    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
    }

    const postLoginData = async () => {
        const { email, password } = userLoginInfo;
        
        if (!email || !password) {
            console.log("fill all the fields before login!!");
            return;
        }
        try {
            const res = await axios.post(
                "/api/auth/login",{
                    email,
                    password
                });
            var data = {email:res.data.email, _id:res.data._id, img: res.data.dpLink, name:res.data.name}
            if (res) {
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
            }
        } catch (error) {
            console.log("wrong credentials error in verfication try again !!!! ");
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Zomato</h1>
                    <span className="loginDesc">Log in to Zomato and Order Your Favourite Food!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} name="email" value={userLoginInfo.email} onChange={handleLoginChange}/>
                        <input placeholder="Password" type="password" required className="loginInput" ref={password} name="password" value={userLoginInfo.password} onChange={handleLoginChange}/>
                        <button className="loginBtn" onClick={postLoginData}>Login In</button>
                        {/* <hr className="hr"/> */}
                        <div className="loginOptions">
                            <button className="googleBtn">  Google</button>
                            <button className="fbBtn"> Facebook</button>
                            <button className="githubBtn"> GitHub</button>
                        </div>
                        <Link to="/" className="loginForgot">Forgot Password ?</Link>
                        <hr className="hr"/>
                        <span className="newText">New to Zomato?
                            <Link className="signUpBtn" to="/user/signup">Create Account</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;