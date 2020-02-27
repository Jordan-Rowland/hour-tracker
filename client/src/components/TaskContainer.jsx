import React from "react";
import "../styles/TaskContainer.css";
// import Task from "./Task.jsx";


function TaskContainer(props) {
  return(
    <div className="task-container">
      {props.tasks}
    </div>
  );
}

export default TaskContainer;