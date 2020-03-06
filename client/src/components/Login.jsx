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
  const [ errorMessage, setErrorMessage ] = useState("");

  async function handleButtonClick(e) {
    e.preventDefault();
    if (signUp) {
      if (passwordInput === confirmPasswordInput && passwordInput.length > 6) {
        const response = await postFetchRequest("/api/users/register", {email: emailInput, password: passwordInput});
        console.log(response)
        if (response.success) {
          props.onLogin(response.token);
        } else {
          setErrorMessage(response.message.toUpperCase())
        }
      } else {
        setErrorMessage("Could not verify sign up. Please make sure your passwords match and is at least 6 characters.")
      }
    } else {
      const response = await postFetchRequest("/api/users/login", {email: emailInput, password: passwordInput});
      if (response.success) {
        props.onLogin(response.token);
      } else {
        setErrorMessage("Invalid username or password")
      }
    }
  }

  function handleCheck() {
    setSignUp(prevState => !prevState)
  }

  function dismissErrors() {
    setErrorMessage("");
  }

  return(
    <>
      <form className="login-form" autoComplete="off">
        <h1>{signUp ? "Sign Up" : "Login"}</h1>
        {
          errorMessage &&
          <p className="errors" onClick={dismissErrors}>{errorMessage}</p>
        }
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
          <div className="sign-in-check">
            Sign-Up
            <input value={signUp} onChange={handleCheck} type="checkbox"/>
          </div>
          <button className="login-button"
            onClick={handleButtonClick}>
              {signUp ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;