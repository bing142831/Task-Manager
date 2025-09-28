// src/components/TaskManager.jsx
import { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "../App.css"; // adjust path if your CSS is elsewhere

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const deletedTask = tasks.find((task) => task.id === id);
    setLastDeleted(deletedTask);
    setTasks(tasks.filter((task) => task.id !== id));

    // Auto clear undo after 5 seconds
    setTimeout(() => setLastDeleted(null), 5000);
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setTasks([...tasks, lastDeleted]);
      setLastDeleted(null);
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

      {lastDeleted && (
        <div className="undo-box">
          <p>Task "{lastDeleted.text}" deleted.</p>
          <button onClick={undoDelete}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
