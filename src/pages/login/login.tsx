

const LoginPage = () => {
    return (
       <>
       <h1>Sign in</h1>
       <input type="text" placeholder="Username" />
       <input type="password" placeholder="Password" />
       <button>Log in</button>
       <label htmlFor="remember-me">Remember me</label>
       <input type="checkbox" id="remember-me" />
       <a href="#">Forget password</a>
       </>
    )
}

export default LoginPage