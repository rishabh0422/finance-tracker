import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import ExpenseCard from "../components/ExpenseCard";
import Graph from "../components/Graph";
import { expenseTracker } from "../ContextAPI/AuthContext";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { dashboard, cardvalue } = useContext(expenseTracker);
  useEffect(() => {
    dashboard();
  }, []);

  return (
    <section className="container-fluid ">
      <h1 className="col-6 text-dark">Dashboard</h1>

      <hr className="border border-dark"></hr>
      <div className="row g-3">
        <div className="col-md-4">
          <ExpenseCard title="Income" value={cardvalue.income} bg="primary" />
        </div>
        <div className="col-md-4">
          <ExpenseCard title="Expense" value={cardvalue.expense} bg="danger" />
        </div>
        <div className="col-md-4">
          <ExpenseCard title="Balance" value={cardvalue.balance} bg="success" />
        </div>
      </div>
      <div className="mt-4 ">
        <Graph />
      </div>
    </section>
  );
};

export default Dashboard;
