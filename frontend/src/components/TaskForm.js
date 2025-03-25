import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import "./TaskForm.css"; 

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <h2 className="task-form-title">Add Task</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="task-form-input"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="task-form-textarea"
      ></textarea>
      <button type="submit" className="task-form-button">Add Task</button>
    </form>
  );
};

export default TaskForm;
