import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const { tasks, deleteTask, toggleTaskCompletion } = useContext(TaskContext);
  const [completedTasks, setCompletedTasks] = useState({});
  const [autoUndoTasks, setAutoUndoTasks] = useState({});

  const handleToggleCompletion = (taskId) => {
    toggleTaskCompletion(taskId);
    
    // If task is being marked as completed, start a timer
    if (!tasks.find(task => task._id === taskId).completed) {
      setCompletedTasks(prev => ({
        ...prev,
        [taskId]: setTimeout(() => {
          // Automatically undo if still completed after 3 seconds
          const task = tasks.find(t => t._id === taskId);
          if (task && task.completed) {
            toggleTaskCompletion(taskId);
            
            // Mark this task for auto-undo visual indication
            setAutoUndoTasks(prev => ({
              ...prev,
              [taskId]: true
            }));


            // Remove auto-undo mark after a short time
            setTimeout(() => {
              setAutoUndoTasks(prev => {
                const newTasks = {...prev};
                delete newTasks[taskId];
                return newTasks;
              });
            }, 300);
          }
          
          // Clear the timeout from the state
          setCompletedTasks(prevTasks => {
            const newTasks = {...prevTasks};
            delete newTasks[taskId];
            return newTasks;
          });
        }, 3000)
      }));
    } else {
      // If task is being unmarked, clear its timeout if it exists
      if (completedTasks[taskId]) {
        clearTimeout(completedTasks[taskId]);
        setCompletedTasks(prev => {
          const newTasks = {...prev};
          delete newTasks[taskId];
          return newTasks;
        });
      }
    }
  };

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => {
      Object.values(completedTasks).forEach(clearTimeout);
    };
  }, [completedTasks]);

  return (
    <div className="task-container">
      <h2 className="task-title">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Add a new task!</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              className={`task-card ${autoUndoTasks[task._id] ? 'auto-undo' : ''}`}
            >
              <div className="task-card-header">
                <Link to={`/edit/${task._id}`} className="edit-icon">✏️</Link>
                <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="task-content">
                <h3 className="task-name">{task.title}</h3>
                <p className="task-description">{task.description}</p>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => handleToggleCompletion(task._id)} 
                  className="btn toggle-btn"
                >
                  {task.completed ? "Undo" : "Mark Done"}
                </button>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

