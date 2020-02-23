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
//
  // Refactor this monstrosity
  function handleTaskClick(clickEvent, ...clickArguments) {
    const id = clickArguments[0];
    let selectedHourNumber;
    if (clickArguments.length > 1) {
      selectedHourNumber = clickArguments[1];
    }
    if (clickEvent === "dispatchClick") {
      try {
        const updatedTasks = [...data];
        const taskIndex = updatedTasks.findIndex(task => task._id === id);
        const newHoursCount = updatedTasks[taskIndex].hoursCompleted + 1
        updatedTasks[taskIndex].hoursCompleted = newHoursCount;
        setData(updatedTasks);
        postFetchRequest(`/api/tasks/${id}`, { hoursCompleted: newHoursCount });
      } catch(err) {
        console.log(err)
      }
    } else if (clickEvent === "dispatchHandleHourClick") {
      const updatedTasks = [...data];
      const taskIndex = updatedTasks.findIndex(task => task._id === id);
      const newHoursCount = selectedHourNumber - 1;
      updatedTasks[taskIndex].hoursCompleted = newHoursCount;
      setData(updatedTasks);
      postFetchRequest(`/api/tasks/${id}`, { hoursCompleted: newHoursCount });
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