import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from './api';
import {useNavigate} from 'react-router-dom'
// import Login from './Login'
import './Login.css'
function GoogleLogin() {
    const navigate=useNavigate()
    const responseGoogle=async (authResult)=>{
        try {
            if(authResult['code']){
                console.log(authResult['code'])
                const result=await googleAuth(authResult['code']);
                console.log(result.data.data.Customer.email)
                const {token}=result.data.data
                const {email,name,image}=result.data.data.Customer
                // const {email,name,image}=result.data.user
                // const {token}=result.data
                const obj={email,name,image,token}
                localStorage.setItem('user-info',JSON.stringify(obj))
                navigate('/dashboard')
            }
        } catch (error) {
            console.log('While login',error)
        }
    }


const googleLogin=useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
    
})
  return (
    // <div className="app">
    //     {/* <button onClick={googleLogin}>Login With Google</button> */}
    //     <Login></Login>
    // </div>


    <div className="login-container">
      <h2 className="form-title">Log in with Google</h2>
      {/* <SocialLogin /> */}
      <p className="separator"><span>or</span></p>
      <form action="#" className="login-form">
        {/* <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" /> */}
        {/* <a href="#" className="forgot-password-link">Forgot password?</a> */}
        {/* <button type="submit" className="login-button">Log In</button> */}
        {/* <button onClick={googleLogin}>Login With Google</button> */}
        <div className="media-options">
                    <a href="#" className="field google">
                        <img src="google.png" alt="" className="google-img"/>
                        {/* <span>Login with Google</span> */}
                        {/* <button onClick={googleLogin}>Login With Google</button> */}
                        <span onClick={googleLogin}>Login With Google</span>
                    </a>
                </div>
      </form>
      <p className="signup-prompt">
        {/* Don&apos;t have an account? <a href="#" className="signup-link">Sign up</a> */}
      </p>
    </div>

  );
}

export default GoogleLogin;
