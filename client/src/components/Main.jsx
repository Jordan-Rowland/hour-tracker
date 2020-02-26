import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import TaskContainer from "./TaskContainer.jsx";
import Task from "./Task.jsx";
import AddTask from "./AddTask.jsx";
import { postFetchRequest, deleteFetchRequest } from "../helpers";

function Main() {
  const [data, setData] = useState([])

  const [ token ] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTUwYWZjMjk4ZjgwMzIxMDI0MGRhM2MiLCJpYXQiOjE1ODIzNDYxOTMsImV4cCI6MTU4Mjk1MDk5M30.nAB9DRFDfnzInHtrOfci9KFxpdZ57rSyBKq-9il5Rtw")

  async function getData(token) {
    const res = await fetch(`/api/tasks/${token}`);
    const response = await res.json();
    setData(response);
  }

  useEffect(() => {
    getData(token);
  }, [token]);

  function handleButtonClick(res) {
    setData(prevState => [res, ...prevState]);
  }

  function handleTaskClick(...args) {
    const id = args[0];
    const selectedHourNumber = args.length > 1 ? args[1] : null;
    try {
      let updatedTasks = [...data];
      const taskIndex = updatedTasks.findIndex(task => task._id === id);
      const selectedTask = updatedTasks[taskIndex];
      const newHoursCount = selectedHourNumber || selectedTask.hoursCompleted + 1
      updatedTasks[taskIndex].hoursCompleted = newHoursCount;
      if (selectedTask.hoursCompleted >= selectedTask.hours) {
        updatedTasks = updatedTasks.filter(task => task._id !== id);
        deleteFetchRequest(`/api/tasks/${id}`, token);
      } else {
        postFetchRequest(`/api/tasks/${id}`, { hoursCompleted: newHoursCount }, token);
      }
      setData(updatedTasks);
    } catch(err) {
      console.log(err)
    }
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
      <AddTask token={token} onClick={handleButtonClick} />
    </div>
  );
}

export default Main;