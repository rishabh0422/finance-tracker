import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import AddModal from "../components/AddModal";
import { expenseTracker } from "../ContextAPI/AuthContext";
const Transaction = () => {
  const { transactiondata, dashboard, deleteTransaction } =
    useContext(expenseTracker);
  const [add, setAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // console.log(transactiondata);
  useEffect(() => {
    dashboard();
  }, [add]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactiondata.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactiondata.length / itemsPerPage);
  const showAddModal = (value) => {
    setAdd(value);
  };
  return (
    <section className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="m-0">Transactions</h1>
        <button
          className="btn btn-dark py-2 px-3 "
          onClick={() => showAddModal(true)}
        >
          Add Transaction
        </button>
      </div>
      <Table transactions={currentTransactions} />

      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-outline-dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-dark"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <AddModal modalValue={add} close={showAddModal} />
    </section>
  );
};

export default Transaction;
