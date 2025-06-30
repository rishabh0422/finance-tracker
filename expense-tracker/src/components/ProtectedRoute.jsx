import React, { Children, useContext } from "react";
import { expenseTracker } from "../ContextAPI/AuthContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate();
  const user = localStorage.getItem("user");
  return user === "admin" || "customer" ? children : navigate('/login');
};

export default ProtectedRoute;
