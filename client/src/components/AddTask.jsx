import React, { useState } from "react";
import "../styles/AddTask.css";
import useInput from "../hooks/useInput";
import { postFetchRequest } from "../helpers";


function AddTask(props) {
  const [ taskInput, handleTaskInputChange, setTodoInput ] = useInput("");
  const [ hoursInput, handleHoursInputChange, setHoursInput ] = useInput(20);
  const [ errorMessage, setErrorMessage ] = useState("");

  async function dispatchHandleButtonClick() {
    if (taskInput.length && hoursInput > 0 && hoursInput <= 20) {
      const postData = taskInput;
      try {
        const res = await postFetchRequest("/api/tasks", {name: postData, hours: hoursInput}, props.token);
        props.onClick(res)
      } catch(err) {
        console.log(err);
      }
      setTodoInput("");
      setHoursInput(20);
      setErrorMessage("");
    } else {
      setErrorMessage("Could not validate task. Please make sure the task has a name and between 1-20 hours");
    }
  }

  function dismissErrors() {
    setErrorMessage("");
  }

  return(
    <div className="add-task">
      <div className="header">
        <h2>Add a new task</h2>
      </div>
      {
        errorMessage &&
        <div className="errors">
        <p onClick={dismissErrors}>{errorMessage}</p>
        </div>
      }
      <input type="text"
        value={taskInput}
        onChange={handleTaskInputChange}
        placeholder="task"
      />
      <input type="number"
        value={hoursInput}
        onChange={handleHoursInputChange}
        placeholder="hours - default 20"
      />
      <button onClick={dispatchHandleButtonClick}>Submit</button>
    </div>
  );
}

export default AddTask;