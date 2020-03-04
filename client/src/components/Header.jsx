import React from "react";
import "../styles/Header.css";
import { PromiseProvider } from "mongoose";


function Header(props) {
  return(
    <div className="header">
      <i class="fas fa-poll-h"></i>
      {/* Icon

        Links: About / Info - Logout(if logged in)
      */}
      <div className="links">
        <ul>
          <li>Info</li>
          {
            props.loggedIn &&
            <li>Logout</li>
          }
        </ul>
      </div>
    </div>
  );
}

export default Header;