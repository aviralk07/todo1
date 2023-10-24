import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Load tasks from local storage when the component first renders
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    console.log("Stored Tasks:", storedTasks);
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      if (editIndex === -1) {
        setTasks([...tasks, task]);
      } else {
        const newTasks = [...tasks];
        newTasks[editIndex] = task;
        setTasks(newTasks);
        setEditIndex(-1);
      }
      setTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setTask(tasks[index]);
  };

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // This effect runs whenever tasks change

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add or Edit a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>{editIndex === -1 ? "Add" : "Edit"}</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <div>
              <button className="edit-button" onClick={() => editTask(index)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
