import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  // Getting
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch(err =>
      console.error(err)
    );
  }, [])

  // Creating
  const addTask = async () => {
    if (newTask.trim() === "") return

    const res = await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ task: newTask })
    })

    await res.json()
    .then(data => setTasks(data))
    setNewTask("")
  }

  // Updating
  const editTask = async (id) => {
    const newTask = prompt("Edit task:")

    if (!newTask || newTask.trim() === "")
      return

    try {
      const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask })
      })

      await res.json()
      .then(data => setTasks(data))
    } catch (err) {
      console.error("Failed to edit task:", err)
    }
  }

  // Deleting
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: "DELETE"
      })

      await res.json()
      .then(data => setTasks(data))
    } catch (err) {
      console.error("Failed to delete task:", err)
    }
  }

  return (
    <>
        <h1>To-Do List</h1>
        <hr></hr>
        <h2>Tasks:</h2>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add new task'/>
        <button onClick={addTask}>Submit</button>
        <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </>
  )
}

export default App;