import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { expenseTracker } from "../ContextAPI/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { role } = useContext(expenseTracker);
  const navigate = useNavigate();
  // const user = localStorage.getItem("user");

  return role !== null ? children : navigate("/login");
};

export default ProtectedRoute;
