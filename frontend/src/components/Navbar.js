import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useAuth } from "../context/AuthContext"; 
import "./Navbar.css"; 

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleAddTaskClick = () => {
    if (!user) {
      alert("You must log in first to add a task!"); 
      navigate("/login"); 
    } else {
      navigate("/add"); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">Task Manager</Link>

        <div className="navbar-buttons">
          <button onClick={handleAddTaskClick} className="navbar-button">Add Task</button>
          
          {!user ? (
            <Link to="/login" className="navbar-button">Login</Link>
          ) : (
            <button onClick={logout} className="navbar-button logout">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
