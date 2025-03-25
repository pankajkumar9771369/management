import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import PrivateRoute from "./services/privateRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";


const App = () => {
  return (
    <AuthProvider> 
      <TaskProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />  
            <Route path="/signup" element={<Signup />} />  
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
