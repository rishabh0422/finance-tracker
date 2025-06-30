import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { calculation } from "../utils/utilities";

export const expenseTracker = createContext();

const AuthContext = ({ children }) => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [customers, setCustomers] = useState([]);
  const [transactiondata, setTransactiondata] = useState([]);
  const [cardvalue, setCardvalue] = useState({});
  useEffect(() => {
    // 
    if (role===null) {
      navigate('/login');
    }
    else{
      navigate('/dashboard');
    }
  }, [role]);

  const login = async (data) => {
    const response = await fetch("http://localhost:4570/customers/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      localStorage.setItem("user", result.role);
      setRole(result.role);
      return result;
    } else {
      return result;
    }
  };
  const logout = async () => {
    const token = await fetch("http://localhost:4570/customers/logout", {
      method: "DELETE",
      credentials: "include",
    });
    const result = await token.json();
    if (result.success) {
      localStorage.removeItem("user");
      setRole("");
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };
  const dashboard = async () => {
    const data = await fetch("http://localhost:4570/customers/dashboard", {
      method: "get",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await data.json();
    if (result.success) {
      setRole(result.data.role);
      setProfile(result.data);
      setTransactiondata(result.transaction);
      setCustomers(result.customers);
      // console.log(result.customers);
      // console.log(result.transaction);
      const data = calculation(result.transaction);
      setCardvalue(data);
      return result;
    } else {
      return result;
    }
  };

  const addTransaction = async (value) => {
    const response = await fetch("http://localhost:4570/transactions/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(value),
    });
    const res = await response.json();
    if (res.success) {
      return res;
    } else {
      return res;
    }
  };
  const deleteTransaction = async (value) => {
    const response = await fetch(
      `http://localhost:4570/transactions/delete/${value}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    if (res.success) {
      return res;
    } else {
      return res;
    }
  };

  const getDeleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:4570/transactions/show/${id}`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    if (res.success) {
      return res;
    } else {
      toast.error(res.message);
      return res;
    }
  };
  const editTransaction = async (id, data) => {
    const response = await fetch(
      `http://localhost:4570/transactions/edit/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (res.success) {
      return toast.success(res.message);
    } else {
      return toast.error(res.message);
    }
  };
  return (
    <div>
      <expenseTracker.Provider
        value={{
          role,
          customers,
          transactiondata,
          cardvalue,
          profile,
          login,
          logout,
          dashboard,
          setProfile,
          addTransaction,
          getDeleteItem,
          deleteTransaction,
          editTransaction,
        }}
      >
        {children}
      </expenseTracker.Provider>
    </div>
  );
};
export default AuthContext;
