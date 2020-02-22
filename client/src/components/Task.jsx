import React from "react";
import "../styles/Task.css";
import HourBlock from "./HourBlock.jsx";


function Task(props) {

  let hoursArray = [];
  for (let i = 1; i <= props.hours; i++) {
    hoursArray.push(i);
  }
  // console.log(hoursArray)

  const hours = hoursArray.map(hour => {
    console.log(hour);
    return <HourBlock key={hour} hourNumber={hour} otherClasses={hour < 6 ? "completed" : ""} />
  })

  // console.log(hours)
  return (
    <div className="task">
      <div className="task-name-area">
        <div className="task-name">
          {props.name}
        </div>
      </div>
      <div className="hours-grid">
        {hours}
      </div>
    </div>
  );
}

export default Task;