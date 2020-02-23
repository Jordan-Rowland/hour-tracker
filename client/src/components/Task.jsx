import React from "react";
import "../styles/Task.css";
import HourBlock from "./HourBlock.jsx";

function Task(props) {
  let hoursArray = [];
  for (let i = 1; i <= props.hours; i++) {
    hoursArray.push(i);
  }

  function dispatchHandleHourClick(selectedHourNumber) { // Line 24
    props.onClick(props.id, selectedHourNumber);
  }

  function dispatchClick() {
    props.onClick(props.id);
  }

  const hours = hoursArray.map(hour => (
    <HourBlock
      key={hour}
      hourNumber={hour}
      onHourClick={dispatchHandleHourClick} // Line 11
      otherClasses={hour <= props.hoursCompleted ? "completed" : ""}
    />
  ));

  return (
    <div className="task">
      <div className="task-name-area" onClick={dispatchClick} >
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