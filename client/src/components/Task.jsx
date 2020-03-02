import React from "react";
import "../styles/Task.css";
import HourBlock from "./HourBlock.jsx";
import ColorPicker from "./ColorPicker.jsx";
import { useState } from "react";
import { useEffect } from "react";

function Task(props) {
  const [ color, setColor ] = useState(props.color)
  const [ colorMenu, setColorMenu ] = useState(false)

  useEffect(() => {
    if (color !== props.color) {
      setColor(props.color);
    }
  }, [props.color, color]);

  const colors = {
    items: ["grey", "red", "green", "aqua", "skyblue", "lavender", "yellow"],
    grey: "rgb(191, 191, 191)",
    red: "rgb(218, 59, 59)",
    green: "rgb(142, 211, 81)",
    aqua: "rgb(81, 211, 181)",
    skyblue: "rgb(81, 144, 211)",
    lavender: "rgb(98, 81, 211)",
    yellow: "rgb(255, 232, 54)"
  }

  let hoursArray = [];
  for (let i = 1; i <= props.hours; i++) {
    hoursArray.push(i);
  }

  function hourClick(selectedHourNumber) { // Line 56
    props.onClick(props.id, selectedHourNumber);
  }

  function handleClick(e) {
    const iconClass = e.target.className
    if (iconClass !== "fas fa-palette") {
      props.onClick(props.id);
    } else if (iconClass === "fas fa-palette") {
      setColorMenu(true);
    }
  }

  function handleColorSelected(color) {
    props.onColorSelected(props.id, color);
    setColorMenu(false);
  }

  const hours = hoursArray.map(hour => (
    <HourBlock
      key={hour}
      hourNumber={hour}
      onHourClick={hourClick} // Line 34
      otherClasses={hour <= props.hoursCompleted ? "completed" : ""}
    />
  ));

  return (
    <div className="task">
      <div className="task-name-area" onClick={handleClick} >
        <div className="task-name" style={{backgroundColor: colors[props.color]}} >
          {props.name}
          <span className="icon">
            <i className="fas fa-palette"></i>
          </span>
        </div>
      </div>
      <div className="hours-grid">
        {hours}
      </div>
      {
        colorMenu &&
        <ColorPicker
          onDispatchColorSelected={handleColorSelected}
        />
      }
    </div>
  );
}

export default Task;