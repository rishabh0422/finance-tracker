import React, { useContext } from 'react'
import { expenseTracker } from '../ContextAPI/AuthContext';
const ExpenseCard = ({value,title,bg}) => {
    const {dashdata}=useContext(expenseTracker);    
    return (
        <div className={`card text-white bg-${bg}`} style={{ width: '19rem' }}>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title fs-3">{title}</h5>
                <p className="card-text text-end fs-4 ">₹{value}</p>
            </div>
        </div>
    )
}

export default ExpenseCard
