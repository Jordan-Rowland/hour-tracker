import React from "react";
import "../styles/Login.css";
import { useState } from "react";
import { postFetchRequest } from "../helpers";
import useInput from "../hooks/useInput";


function Login(props) {

  const [ signUp, setSignUp ] = useState(false);
  const [ emailInput, handleEmailInput ] = useInput();
  const [ passwordInput, handlePasswordInput ] = useInput();
  const [ confirmPasswordInput, handleConfirmPasswordInput ] = useInput();

  async function handleButtonClick(e) {
    e.preventDefault();
    if (signUp) {
      // Handle validation for password
      postFetchRequest("/api/users/register", {email: emailInput, password: passwordInput});
      props.onSignUp();
    } else if (!signUp) {
      const response = await postFetchRequest("/api/users/login", {email: emailInput, password: passwordInput});
      if (response.success) {
        props.onLogin(response.token);
      }
    }
  }

  function handleCheck() {
    setSignUp(prevState => !prevState)
  }

  return(
    <>
      <form className="login-form" autoComplete="off">
        <h1>{signUp ? "Sign Up" : "Login"}</h1>
        <label>Email</label>
        {/* Change this to email type */}
        <input autoComplete="off" type="text" value={emailInput} onChange={handleEmailInput} />
        <label>Password</label>
        <input autoComplete="off" type="password" value={passwordInput} onChange={handlePasswordInput} />
        {
          signUp &&
          <>
          <label>Confirm Password</label>
          <input autoComplete="off" type="password" value={confirmPasswordInput} onChange={handleConfirmPasswordInput} />
          </>
        }
        <div className="controls">
          Sign-Up
          <input value={signUp} onChange={handleCheck} type="checkbox"/>
          <button
            onClick={handleButtonClick}>
              {signUp ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;