import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import TaskContainer from "./TaskContainer.jsx";
import Task from "./Task.jsx";


function Main() {
  // const [data, setData] = useState([])
  const [ updated, setUpdated ] = useState(Date.now())

  const [data, setData] = useState([{hours: 20,
    hoursCompleted: 12,
    _id: "5e50b6d5270fe2225ddf3c13",
    name: "Node.js",
    user_id: "5e50afc298f803210240da3c",
    date: "2020-02-22T05:06:29.145Z"},
    {hours: 20,
    hoursCompleted: 6,
    _id: "5e50b6cf270fe2225ddf3c12",
    name: "Express",
    user_id: "5e50afc298f803210240da3c",
    date: "2020-02-22T05:06:23.749Z"},
    {hours: 16,
    hoursCompleted: 4,
    _id: "5e50b2b3e8ece62224be29f5",
    name: "JWT",
    user_id: "5e50afc298f803210240da3c",
    date: "2020-02-22T04:48:51.894Z"}])

  const [ token ] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTUwYWZjMjk4ZjgwMzIxMDI0MGRhM2MiLCJpYXQiOjE1ODIzNDYxOTMsImV4cCI6MTU4Mjk1MDk5M30.nAB9DRFDfnzInHtrOfci9KFxpdZ57rSyBKq-9il5Rtw")
  const [inputData, setInputData] = useState("")

  async function getData() {
    const res = await fetch(`/api/tasks/${token}`);
    const response = await res.json();
    // setData(response);
  }

  async function fetchPost(url, data) {
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

  function handleClick() {
    const postData = inputData;
    try {
      const res = fetchPost("/api/tasks", {name: postData});
      console.log(res);
    } catch(err) {
      console.log(err);
    }
    setInputData("");
    // getData();
  }

  async function handleTaskClick(id) {
    try {
      const updatedTasks = [...data];
      const taskIndex = updatedTasks.findIndex(task => task._id === id);
      // const res = await fetchPost(`/api/tasks/${id}`, { hoursCompleted: updatedTasks[taskIndex].hoursCompleted + 1 });
      // console.log(res);
      // updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], hoursCompleted: updatedTasks[taskIndex].hoursCompleted + 1 };
      setData([...updatedTasks]);
      setUpdated(Date.now())
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
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Main;