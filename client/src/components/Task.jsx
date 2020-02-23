import React, { useEffect } from "react";
import "../styles/Task.css";
import HourBlock from "./HourBlock.jsx";
import { useState } from "react";


function Task(props) {
  const [ hoursCompleted, setHoursCompleted ] = useState(props.hoursCompleted);
  // const [hoursCompleted, setHoursCompleted] = useState(4);

  let hoursArray = [];
  for (let i = 1; i <= props.hours; i++) {
    hoursArray.push(i);
  }

  // useEffect(() => {
  //   console.log("Task Effect Run")
  // }, [hoursCompleted])

  function dispatchClick() {
    console.log("Dispatch clicked");
    setHoursCompleted(prevState => prevState + 1);
    console.log(hoursCompleted);
    props.onClick(props.id);
  }

  const hours = hoursArray.map(hour => (
    <HourBlock
      key={hour}
      hourNumber={hour}
      onHourClick={handleHourClick}
      otherClasses={hour <= hoursCompleted ? "completed" : ""}
    />
  ));

  console.log("task Rendered");

  return (
    <div className="task">
      <div className="task-name-area" onClick={dispatchClick} >
        <div className="task-name">
          {hoursCompleted}
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