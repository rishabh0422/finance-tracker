const express = require("express");
const app = express();
app.use(express.json());
const env = require("dotenv").config();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { authMiddleware } = require("./middleware/adminMiddleware");
const transactions = require("./routes/transactionRoute");
const customers = require("./routes/customerRoute");
const { connectDB } = require("./config/connection");
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieparser());
connectDB();
// app.use(authMiddleware);
app.use("/transactions", transactions);
app.use("/customers", customers);
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`http://localhost:${process.env.PORT}`);
  }
});
