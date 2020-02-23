import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import TaskContainer from "./TaskContainer.jsx";
import Task from "./Task.jsx";

function Main() {
  const [data, setData] = useState([])
  const [inputData, setInputData] = useState("")

  const [ token ] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTUwYWZjMjk4ZjgwMzIxMDI0MGRhM2MiLCJpYXQiOjE1ODIzNDYxOTMsImV4cCI6MTU4Mjk1MDk5M30.nAB9DRFDfnzInHtrOfci9KFxpdZ57rSyBKq-9il5Rtw")

  async function getData() {
    const res = await fetch(`/api/tasks/${token}`);
    const response = await res.json();
    setData(response);
  }


  // Move to helpers file
  async function postFetchRequest(url, data) {
    const res = await fetch(
      url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ ...data, token: token }),
    });
    const response = await res.json();
    return response;
  }

  async function deleteFetchRequest(url) {
    const res = await fetch(
      url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token: token }),
    });
    const response = await res.json();
    return response;
  }

  useEffect(() => {
    getData();
  }, [])

  function handleButtonClick() {
    const postData = inputData;
    try {
      const res = postFetchRequest("/api/tasks", {name: postData});
      console.log(res);
    } catch(err) {
      console.log(err);
    }
    setInputData("");
  }

  function handleTaskClick(...args) {
    const id = args[0];
    const selectedHourNumber = args.length > 1 ? args[1] : null;
    try {
      const updatedTasks = [...data];
      const taskIndex = updatedTasks.findIndex(task => task._id === id);
      const selectedTask = updatedTasks[taskIndex];
      const newHoursCount = selectedHourNumber || selectedTask.hoursCompleted + 1
      updatedTasks[taskIndex].hoursCompleted = newHoursCount;
      if (selectedTask.hoursCompleted >= selectedTask.hours) {
        delete updatedTasks[taskIndex];
        deleteFetchRequest(`/api/tasks/${id}`);
      } else {
        postFetchRequest(`/api/tasks/${id}`, { hoursCompleted: newHoursCount });
      }
      setData(updatedTasks);
    } catch(err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    setInputData(e.target.value)
  }

  const tasks = data.map(task => (
    <Task
      key={task._id}
      id={task._id}
      name={task.name}
      hours={task.hours}
      hoursCompleted={task.hoursCompleted}
      onClick={handleTaskClick}
    />
  ))

  return(
    <div className="main">
      <header>
        <span>Track hours</span>
      </header>
      <TaskContainer tasks={tasks} />
      <input type="text" value={inputData} onChange={handleChange}/>
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}

export default Main;