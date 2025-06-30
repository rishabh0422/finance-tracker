const express = require("express");
const route = express.Router();
const {
  addTransaction,
  updateTransaction,
  showTransaction,
  deleteTransaction,
  getTransaction,
} = require("../controllers/transactionControllers");
const { authMiddleware } = require("../middleware/adminMiddleware");

route.post("/add", authMiddleware, addTransaction);
route.get("/show", showTransaction);
route.get("/show/:id", authMiddleware, getTransaction);
route.patch("/edit/:id", authMiddleware, updateTransaction);
route.delete("/delete/:id", deleteTransaction);
module.exports = route;
