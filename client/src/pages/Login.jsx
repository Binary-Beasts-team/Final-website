import "../css/login.css";
import {useRef} from "react";


function Login() {

     // Submitted Email-Password
    const email = useRef();
    const password = useRef();

    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
        console.log(email);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Zomato</h1>
                    <span className="loginDesc">Log in to Zomato and Order Your Favourite Food!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" type="password" required className="loginInput" ref={password} />
                        <button className="loginBtn">Log In</button>
                        {/* <hr className="hr"/>
                        <div className="loginOptions">
                            <button className="googleBtn">  Google</button>
                            <button className="fbBtn"> Facebook</button>
                            <button className="githubBtn"> GitHub</button>
                        </div> */}
                        <span className="loginForgot">Forgot Password ?</span>
                        <hr className="hr"/>
                        <span className="newText">New to Zomato?</span>
                        <button className="signUpBtn">Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;