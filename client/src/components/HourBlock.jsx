import React from "react";
import "../styles/HourBlock.css";
import { useState } from "react";


function HourBlock(props) {
  const [otherClasses, setOtherClasses] = useState(props.otherClasses)

  function handleClick() {
    setOtherClasses("")
  }

  return(
    <div className={`hour-block-area ${otherClasses}`} onClick={handleClick}>
      <div className="hour">
        {props.hourNumber}
      </div>
    </div>
  );
}

export default HourBlock;