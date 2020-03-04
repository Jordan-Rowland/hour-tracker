import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import useStorage from "./hooks/useStorage"
import { postFetchRequest } from "./helpers";


function App() {
  const [ token, setToken ] = useState("");
  const [ tokenAcquired, setTokenAcquired ] = useState(false);
  const [ tokenStorage, setTokenStorage] = useStorage("token");

  useEffect(() => {
    async function checkToken() {
      if (tokenStorage().length) {
        console.log("Token in storage");
        const tokenStored = tokenStorage()[0];
        const response = await postFetchRequest("/api/users/verify", {}, tokenStored);
        console.log(response);
        if (response.success) {
          handleLogin(tokenStored);
        }
      }
    }

    checkToken();
  }, [])

  function handleLogin(e) {
    const newToken = e;
    setToken(newToken);
    setTokenStorage(newToken)
    setTokenAcquired(true);
  }

  function handleLogout() {
    setToken("");
    localStorage.clear();
    setTokenAcquired(false);
  }

  return(
    <>
    <Header loggedIn={tokenAcquired} />
      {
        tokenAcquired ?
        <>
          <Main token={token} />
          <button onClick={handleLogout}>Logout</button>
        </> :
        <Login onLogin={handleLogin} />
      }
    </>
  );
}

export default App;