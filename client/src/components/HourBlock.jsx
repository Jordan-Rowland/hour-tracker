import React from "react";
import "../styles/HourBlock.css";
import { useState } from "react";


function HourBlock(props) {

  function dispatchHourClick() {
    props.onHourClick(props.hourNumber)
  }

  return(
    <div className={`hour-block-area ${props.otherClasses}`} onClick={dispatchHourClick}>
      <div className="hour">
        {props.hourNumber}
      </div>
    </div>
  );
}

export default HourBlock;