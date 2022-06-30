import "../css/login.css";

function login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Zomato</h1>
                    <span className="loginDesc">Log in to Zomato and ORDER NOW</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox">
                        <input type="email" placeholder="Email" className="loginInput" />
                        <input type="password" placeholder="password" className="loginInput" />
                        <button className="loginBtn">Log In</button>
                        <span className="loginForgot">Forgot Password ?</span>
                        <hr className="loginHr"/>
                        <span className="loginForgot">New to Zomato?</span>
                        <button className="signUpBtn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default login