import React from "react";
// import "./styles/App.css";
import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";


function App() {
  const tokenAcquired = true;
  return(
    <>
      {
        !tokenAcquired ?
        <Login /> :
        <Main />
      }
    </>
  );
}

export default App;