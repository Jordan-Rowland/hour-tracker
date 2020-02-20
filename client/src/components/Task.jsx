import React from "react";
import "../styles/Task.css";


function Task(props) {


  return(
    <div className="task">
      {props.name}  - {props.hours}
    </div>
  );
}

export default Task;