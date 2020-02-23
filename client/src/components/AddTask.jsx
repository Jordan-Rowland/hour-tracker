import React from "react";
// import "../styles/AddTask.css";
import useInput from "../hooks/useInput";
import { postFetchRequest } from "../helpers";


function AddTask(props) {
  const [ taskInput, setTodoInput, handleTaskInputChange ] = useInput("");

  async function dispatchHandleButtonClick() {
    const postData = taskInput;
    try {
      const res = await postFetchRequest("/api/tasks", {name: postData}, props.token);
      props.onClick(res)
    } catch(err) {
      console.log(err);
    }
    setTodoInput("");
  }

  return(
    <>
      <input type="text" value={taskInput} onChange={handleTaskInputChange}/>
      <button onClick={dispatchHandleButtonClick}>Submit</button>
    </>
  );
}

export default AddTask;