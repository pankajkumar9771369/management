import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import "../components/TaskForm.css"; 

const EditTask = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const foundTask = tasks.find((t) => t._id === id);
    if (foundTask) setTask(foundTask);
  }, [id, tasks]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, task);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <h2 className="task-form-title">Edit Task</h2>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        className="task-form-input"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        className="task-form-textarea"
      ></textarea>
      <button type="submit" className="task-form-button">Update Task</button>
    </form>
  );
};

export default EditTask;
