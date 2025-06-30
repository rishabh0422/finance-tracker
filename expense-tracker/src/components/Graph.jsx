import React, { useContext } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import {expenseTracker} from '../ContextAPI/AuthContext'
const Graph = () => {
  const {cardvalue}=useContext(expenseTracker);
  const data = [
    {
      name: "Income",
      amount: cardvalue?.income || 0,
    },
    {
      name: "Expense",
      amount: cardvalue?.expense || 0,
    },
    {
      name: "Balance",
      amount: cardvalue?.balance || 0,
    },
  ];
  return (
    <div className="card shadow p-3">
      <h4 className="mb-3">Financial Overview</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
