import "../css/login.css";
import {useRef,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {FcGoogle} from 'react-icons/fc'


function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [userLoginInfo, setuserLoginInfo] = useState({
        email: "",
        password: "",
        
    });
    const [user,setUser] = useState({})
    const [checkValue,setcheckValue] = useState("student");



    const handleGoogleOnClick = () => {
        window.location = '/auth/google'
    }

    const handleLoginChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setuserLoginInfo({ ...userLoginInfo, [name]: val });
    };
     // Submitted Email-Password
    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
    }

    const handleForgotPassword = async () => {
        const { email } = userLoginInfo;
        
        const Loadtoast = toast.loading("logging in wait.....");

        if (!email) {
            toast.error("fill the email first!!")
            return;
        }
        try {
            const res = await axios.put(
                "/api/student/forgotpassword",{
                    email,
                });
            if (res) {
                toast.success("sent the verification email to your registered email address !!");
            }

            toast.dismiss(Loadtoast);
        } catch (error) {
            toast.dismiss(Loadtoast);

            toast.error("something went wrong cheack your internet connection!!")
            console.log("wrong credentials error in verfication try again !!!! ");
        }
    };
    const postLoginData = async () => {
        const { email, password } = userLoginInfo;
        
        const Loadtoast = toast.loading("logging in wait.....");

        if (!email || !password) {
            toast.error("fill all the fields before login!!")
            return;
        }
        try {
            const res = await axios.post(
                `/api/auth/${checkValue}/login`,{
                    user:email,
                    password
                });
            var data = {email:res.data.email, _id:res.data._id, img: res.data.dpLink, name:res.data.name,regNo: res.data.regNo}
            if (res) {
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log(res);
            navigate("/");
            }

            toast.dismiss(Loadtoast);
        } catch (error) {
            toast.dismiss(Loadtoast);

            toast.error("something went wrong cheack your internet connection!!")
            console.log("wrong credentials error in verfication try again !!!! ");
        }
    };

    const handleCheckbox = (e)=>{

        if(e.target.checked){
            setcheckValue("student");
        }else{
            setcheckValue("faculty")
        }
    }
    console.log(checkValue);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Digit io</h1>
                    <span className="loginDesc">
                        Welcome to IIIT Dharwad's Digital Portal for Outpass Application and Authentication.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" required className="loginInput " ref={email} name="email" value={userLoginInfo.email} onChange={handleLoginChange}/>
                        <input placeholder="Password" type="password" required className="loginInput" ref={password} name="password" value={userLoginInfo.password} onChange={handleLoginChange}/>
                        <div className="check-box">
                            <label htmlFor="checkbox" className="mx-3">Are you a student?</label>
                            <input type="checkbox"  name="checkbox" id="checkbox" onChange={handleCheckbox} />
                        </div>
                        <button className="loginBtn mt-1" onClick={postLoginData}>Log In</button>

                        <div className="flex my-1 p-1 gap-4 border items-center cursor-pointer googleSignIn" onClick={handleGoogleOnClick}>
                            <FcGoogle size={30} />
                            <p className="text-left">Sign In with Google</p>
                        </div>
                        <button onClick={handleForgotPassword} className="loginForgot">Forgot Password ?</button>
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