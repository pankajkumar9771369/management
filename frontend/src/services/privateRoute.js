import React from "react";
import { Navigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);



// Protected Route Component

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" />; 
};

export default PrivateRoute;
