import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import TaskContainer from "./TaskContainer.jsx";
import Task from "./Task.jsx";
import AddTask from "./AddTask.jsx";
import { postFetchRequest, deleteFetchRequest } from "../helpers";

function Main(props) {
  const [data, setData] = useState([])


  useEffect(() => {
    async function getData(token) {
      const res = await fetch(`/api/tasks/${props.token}`);
      const response = await res.json();
      setData(response);
    }

    getData(props.token);
  }, [props.token]);

  function handleButtonClick(res) {
    setData(prevState => [...prevState, res]);
  }

  function handleTaskClick(...args) {
    console.log(args)
    const id = args[0];

    let updatedTasks = [...data];
    const taskIndex = updatedTasks.findIndex(task => task._id === id);
    const selectedTask = updatedTasks[taskIndex];
    console.log("handleTaskClick");
    const selectedHourNumber = args.length > 1 ? args[1] : null;
    console.log(selectedHourNumber)

    try {
      const newHoursCount = selectedHourNumber || selectedTask.hoursCompleted + 1
      updatedTasks[taskIndex].hoursCompleted = newHoursCount;
      if (selectedTask.hoursCompleted >= selectedTask.hours) {
        updatedTasks = updatedTasks.filter(task => task._id !== id);
        deleteFetchRequest(`/api/tasks/${id}`, props.token);
      } else {
        postFetchRequest(
          `/api/tasks/${id}`,
          { hoursCompleted: newHoursCount },
          props.token
        );
      }
      setData(updatedTasks);
    } catch(err) {
      console.log(err)
    }
  }

  async function handleColorSelect(...args) {
    const id = args[0]
    let updatedTasks = [...data];
    const taskIndex = updatedTasks.findIndex(task => task._id === id);
    const color = args[1]
    updatedTasks[taskIndex].color = color
    setData(updatedTasks);
    postFetchRequest(
      `/api/tasks/${id}`,
      { color: color },
      props.token
    );
  }

  const tasks = data.map(task => (
    <Task
      key={task._id}
      id={task._id}
      name={task.name}
      hours={task.hours}
      hoursCompleted={task.hoursCompleted}
      onClick={handleTaskClick}
      color={task.color}
      onColorSelected={handleColorSelect}
    />
  ))

  return(
    <div className="main">
      <header>
        <span data-testid="header">Track Hours</span>
      </header>
      <TaskContainer tasks={tasks} />
      <AddTask token={props.token} onClick={handleButtonClick} />
    </div>
  );
}

export default Main;