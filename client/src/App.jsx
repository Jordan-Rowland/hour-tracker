import React, { useState } from "react";
// import "./styles/App.css";
import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";


function App() {
  const [ token, setToken ] = useState("")
  const [ tokenAcquired, setTokenAcquired ] = useState(false)

  // function checkToken() {
  // }

  function handleLogin(e) {
    setToken(e)
    setTokenAcquired(true);
  }

  return(
    <>
      {
        !tokenAcquired ?
        <Login
          onLogin={handleLogin}
        /> :
        <Main token={token}/>
      }
    </>
  );
}

export default App;