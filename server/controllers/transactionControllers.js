const { Customer, Transaction } = require("../models/index");

const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body;
    // console.log(req.body);

    // console.log(`userID: ${req.data.user}`);
    if (!req.body) {
      return res.status(400).send({
        success: false,
        message: "All fields required",
      });
    }
    const transaction = new Transaction({
      customer_id: req.data.user,
      title: title,
      amount: amount,
      type: type,
      category: category,
      date: date,
      description: description || "N/A",
    });

    await transaction.save();
    return res.status(200).send({
      success: true,
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(`AddTransaction Error: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error while adding transaction",
      error: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(`updateTransaction: ${id}`);
    console.log(req.body);
    // console.log(`customer_id: ${req.data.user}`);
    
    const data = await Transaction.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          customer_id: req.data.user,
          title: req.body.title,
          amount: req.body.amount,
          type: req.body.type,
          category: req.body.category,
          date: req.body.transaction_date,
          description: req.body.description,
        }
      },
      {new:true}
    );
    if (!data) {
      res.status(401).send({
        success: false,
        message: "Error in edit transaction",
      });
    }
    res.status(200).send({
      success: true,
      message: "Transaction Update successfully",
    });
  } catch (error) {
    console.log(`Edit Transaction: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const showTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res
      .status(200)
      .send({ success: true, meggage: "Show Transaction", data: transactions });
  } catch (error) {
    res.status(500).send({ success: false, meggage: "Error in Transaction" });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const transaction = await Transaction.deleteOne({ _id: id });
    if (!transaction) {
      return res
        .status(404)
        .send({ success: false, meggage: "Transaction can't exist" });
    }
    return res
      .status(200)
      .send({ success: true, meggage: "Delete Transaction" });
  } catch (error) {
    console.log(`Deletetransaction: ${error}`);
    return res
      .status(500)
      .send({ success: false, meggage: "Internal server error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(`edititemid: ${id}`);

    const item = await Transaction.findOne({ _id: id });
    if (!item) {
      res.status(404).send({
        success: false,
        message: "Transaction can't exist",
      });
    }
    res.status(200).send({
      success: true,
      data: item,
    });
  } catch (error) {
    console.log(`Get particular transaction: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addTransaction,
  updateTransaction,
  showTransaction,
  deleteTransaction,
  getTransaction,
};
