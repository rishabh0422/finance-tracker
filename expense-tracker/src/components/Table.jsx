import React, { useContext, useEffect, useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { expenseTracker } from "../ContextAPI/AuthContext";
const Table = ({ transactions }) => {
  const { dashboard, deleteTransaction } = useContext(expenseTracker);

  const [modalValue, setModalValue] = useState({
    edit: { open: false, id: null },
    delete: { open: false, id: null },
  });
  const showEditWindow = (id, value) => {
    setModalValue({ 
        edit: { open: value, id: id },
        delete: { open: false, id: null }
    });
  };
  const showDeleteWindow = (id, value) => {
    setModalValue({
        edit: { open:false, id:null },
        delete: { open: value, id: id }
     });
  };
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => showEditWindow(item._id, true)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => showDeleteWindow(item._id, true)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <EditModal modalValue={modalValue} close={showEditWindow} />
      <DeleteModal modalValue={modalValue} close={showDeleteWindow} />
    </div>
  );
};

export default Table;
