import React, { useContext, useEffect, useState } from "react";
import { expenseTracker } from "../ContextAPI/AuthContext";

const DeleteModal = ({ modalValue, close }) => {
  const { deleteTransaction, getDeleteItem,dashboard } = useContext(expenseTracker);
  const [deleteItem, setDeleteItem] = useState({});
  console.log(modalValue);
  useEffect(() => {
    console.log("delete modal mount");
    if (modalValue.delete.open) {      
        const get = async () => {
          const res = await getDeleteItem(modalValue.delete.id);
          setDeleteItem(res.data);
        };
        get();
    }
    return () => {
      // console.log("delete modal unmount");
      setDeleteItem({});

      dashboard();  
    }
  }, [modalValue.delete.open]);
  return (
    <>
      <div
        className={`modal fade ${modalValue.delete.open ? "show d-block" : ""}`}
        id="myModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title"> Delete Transaction</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => close(null, false)}
              ></button>
            </div>
            <div className="modal-body">
              <h4 className={`${deleteItem.type === "Expense" ? "text-danger" : "text-success"}`}>Do you want to delete this {deleteItem.type}</h4>
              <p>
                <span className={`${deleteItem.type === "Expense" ? "text-danger" : "text-success"}`}>
                  {deleteItem.type === "Expense" ? "Expense" : "Income"}:
                </span>
                {deleteItem.amount}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => close(null, false)}
              >
                Close
              </button>
              <button
                type="button"
                className={`btn ${deleteItem.type === "Expense" ? "btn-danger" : "btn-success"}`}
                onClick={async() =>{ 
                  await deleteTransaction(modalValue.delete.id)
                  close(null, false); // This will close the modal
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
