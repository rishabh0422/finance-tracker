import React,{useContext, useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { expenseTracker } from '../ContextAPI/AuthContext';
const SideBar = () => {
  const {logout,profile,role}=useContext(expenseTracker);
  // console.log(`sidebar: ${role}`);
  
  return (
    <nav className="d-flex">
      <div className="bg-dark text-white p-3 vh-100 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
        {/* Top: Logo and Navigation */}
        <div>
          <h4 className="mb-4"><Link to='/dashboard' className='text-decoration-none text-white fs-3'>Finance Tracker</Link></h4>
          <ul className="list-unstyled">
            <li className="nav-item mb-3">
              <Link className="text-decoration-none text-white fs-5" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="text-decoration-none text-white fs-5" to="/transactions">Transactions</Link>
            </li>
           { role==="admin"&&<li className="nav-item mb-3">
              <Link className="text-decoration-none text-white fs-5" to="/customers">Customers</Link>
            </li>}
            <li className="nav-item">
              <Link className="text-decoration-none text-white fs-5" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Bottom: User Info and Logout */}
        <div>
          <h5 className="mb-3 ">Hello, {profile.name}</h5>
          <button className="btn btn-danger w-100" onClick={()=>logout()}>Logout</button>
        </div>
      </div>
    </nav>

  )
}

export default SideBar
