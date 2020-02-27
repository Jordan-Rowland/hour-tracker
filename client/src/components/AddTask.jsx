import React from "react";
import "../styles/AddTask.css";
import useInput from "../hooks/useInput";
import { postFetchRequest } from "../helpers";


function AddTask(props) {
  const [ taskInput, setTodoInput, handleTaskInputChange ] = useInput("");
  const [ hoursInput, setHoursInput, handleHoursInputChange ] = useInput(20);

  async function dispatchHandleButtonClick() {
    const postData = taskInput;
    try {
      const res = await postFetchRequest("/api/tasks", {name: postData, hours: hoursInput}, props.token);
      props.onClick(res)
    } catch(err) {
      console.log(err);
    }
    setTodoInput("");
    setHoursInput(20);
  }

  return(
    <div className="add-task">
      <div className="header">
        <h2>Add a new task</h2>
      </div>
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