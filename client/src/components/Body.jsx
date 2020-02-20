import React, { useEffect, useState } from "react";
import "../styles/Body.css";


function Body() {
  const [data, setData] = useState([])
  const [inputData, setInputData] = useState("")

  async function getData() {
    const res = await fetch("/api/tasks");
    const response = await res.json();
    setData(response)
  }

  async function fetchPost(url, data) {
    const res = await fetch(
      url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
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
      const res = fetchPost("/api/tasks", {taskName: postData})
      console.log(res)
    } catch(err) {
      console.log(err)
    }
    setInputData("");
    getData();
  }

  function handleChange(e) {
    setInputData(e.target.value)
    console.log(inputData);
  }

  const tasks = data.map(task => (
    <li key={task._id}>{task.taskName}</li>
  ))

  return(
    <div className="main">
      <ul>
        {tasks}
      </ul>
      <input type="text" value={inputData} onChange={handleChange}/>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Body;