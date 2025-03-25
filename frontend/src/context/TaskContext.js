import { createContext, useState, useEffect } from "react";
import api from "../services/api"; 
import { useAuth } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
 const { user } = useAuth();
  //  Fetch only tasks for the logged-in user
  useEffect(() => {
    if (user) {
      api.get("/tasks")
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(" Error fetching tasks:", err.response?.data));
    }
  }, [user]); 

  // Send token when creating a task
  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task); 
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(" Error adding task:", err.response?.data);
    }
  };

  
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedTask); 
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(" Error updating task:", err.response?.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`); 
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(" Error deleting task:", err.response?.data);
    }
  };
  const toggleTaskCompletion = async (id) => {
    try {
        console.log(`📤 Toggling completion for Task: ${id}`);
        const res = await api.patch(`/tasks/${id}/toggle`);
        
        setTasks(tasks.map(task => 
            task._id === id ? { ...task, completed: res.data.completed } : task
        ));
        console.log(` Task ${id} marked as ${res.data.completed ? "Completed" : "Pending"}`);
    } catch (err) {
        console.error(" Error toggling task completion:", err.response?.data || err.message);
    }
};


  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask,toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
