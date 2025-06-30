import React, { useContext, useState } from "react";
import { expenseTracker } from "../ContextAPI/AuthContext";
import { toast } from "react-toastify";
const AddModal = ({ modalValue, close }) => {
  const {addTransaction}=useContext(expenseTracker);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    transaction_date: "",
    description: "",
  });
  const handleForm = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    const res = await addTransaction(form);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setForm({
      title: "",
      amount: "",
      type: "",
      category: "",
      transaction_date: "",
      description: "",
    });
    close(false);
  };

  return (
    <>
      <div
        className={`modal fade ${modalValue ? "show d-block" : ""}`}
        id="myModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title"> Add Transaction</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => close(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="row" onSubmit={formSubmit}>
                <div className="row">
                  {/* <div className="mb-3 col-md-6">
                    <label className="form-label">Customer</label>
                    <select
                      className="form-select"
                      name="customer"
                      value={form.customer}
                      onChange={handleForm}
                    >
                      <option value="">-- Select Customer --</option>
                      <option value="1">Customer A</option>
                      <option value="2">Customer B</option>
                    </select>
                  </div> */}

                  <div className="mb-3 col-md-12">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={form.title}
                      onChange={handleForm}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      name="type"
                      value={form.type}
                      onChange={handleForm}
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={form.category}
                      onChange={handleForm}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="row flex-column">
                      <div className="mb-3 col-md-12">
                        <label className="form-label">Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          name="amount"
                          value={form.amount}
                          onChange={handleForm}
                        />
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="transaction_date"
                            value={form.transaction_date}
                            onChange={handleForm}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="description"
                      value={form.description}
                      onChange={handleForm}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => close(false)}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add Transaction"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
