import React, { useContext, useEffect } from 'react';
import {expenseTracker} from '../ContextAPI/AuthContext';
const Customers = () => {
    const {customers,dashboard}=useContext(expenseTracker);
    useEffect(()=>{
            dashboard();
    },[])
  return (
   <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total transactions</th>
                            <th>Income</th>
                            <th>Expense</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers.map((item,index)=>{
                      return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.transactionCount}</td>
                            <td>{item.totalIncome}</td>
                            <td>{item.totalExpense}</td>
                            <td>{item.balance}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Customers
