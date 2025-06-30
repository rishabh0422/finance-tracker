const express = require("express");
const route = express.Router();
const { authMiddleware } = require("../middleware/adminMiddleware");
const {
  addCustomer,
  updateCustomer,
  showCustomer,
  deleteCustomer,
  validateCustomer,
  destroyToken,
  getDashboard,
} = require("../controllers/customerControllers");
route.get("/dashboard", authMiddleware, getDashboard);
route.post("/login", validateCustomer);
route.post("/add", addCustomer);
route.get("/show", showCustomer);
route.patch("/update/:id", updateCustomer);
route.delete("/delete/:id", deleteCustomer);
route.delete("/logout", destroyToken);
module.exports = route;
