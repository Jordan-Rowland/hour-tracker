import React, { useState } from "react";
import "../styles/Header.css";
import InfoModal from "./InfoModal.jsx";


function Header(props) {
  const [ modalShow, setModalShow ] = useState(false);

  function showModal() {
    setModalShow(true);
  }

  function handleClick() {
    props.onLogout();
  }

  return(
    <>
    <div className="header-nav">
      <i className="fas fa-poll-h"></i>
      <div className="links">
        <ul>
          <li onClick={showModal}>Info</li>
          { props.loggedIn && <li onClick={handleClick}>Logout</li> }
        </ul>
      </div>
    </div>
    { modalShow && <InfoModal onCloseModal={() => setModalShow(false)} /> }
    </>
  );
}

export default Header;