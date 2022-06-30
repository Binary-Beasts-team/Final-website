import "../css/signup.css";
import {useRef} from "react";

function Signup() {

    // Submitted Email-Password
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();

    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
        console.log(email);
    }

    return (
        <div className="signup">
            <div className="signupWrapper">
                <div className="signupLeft">
                    <h1 className="signupLogo">Zomato</h1>
                    <span className="signupDesc">Sign Up to Zomato and Order Your Favourite Food!</span>
                </div>
                <div className="signupRight">
                    <form className="signupBox" onSubmit={handleSubmit}>
                        <input type="email" required placeholder="Email" className="signupInput" ref={email} />
                        <input type="password" required placeholder="Password" className="signupInput" ref={password} />
                        <input type="password" required placeholder="Re-Enter Password" className="signupInput" ref={rePassword}/>
                        <button className="signupBtn">Sign Up</button>

                        <hr className="hr"/>
                        <span className="newText">Already have an account?</span>
                        <button className="loginBtn">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;