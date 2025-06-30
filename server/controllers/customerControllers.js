const { Customer, Transaction } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const addCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send("All fields are required");
    }
    if (checkAdmin(email) === "admin") {
      let role = checkAdmin(email) === "admin" ? "admin" : "customer";
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = new Customer({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await createUser.save();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "customer added successfully",
      data: customer,
    });
  } catch (error) {
    console.log(`AddCustomer: ${error}`);
    res.status(500).send({ success: false, message: "error to store data" });
  }
};
const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomer = await Customer.updateOne(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
    );
    res.status(200).send({
      success: true,
      message: "customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.log(`Update: ${error}`);
    res
      .status(500)
      .send({ success: false, meggage: "Error in update", error: error });
  }
};
const showCustomer = async (req, res) => {
  try {
    const data = await Customer.find();
    res.status(200).send({
      success: true,
      message: "All customer data",
      customer: data
    });
  } catch (error) {
    console.log(`Display: ${error}`);
    res.status(500).send({ success: false, meggage: error });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCustomer = await Customer.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "Delete customer data",
      customer: deleteCustomer,
    });
  } catch (error) {
    console.log(`Delete: ${error}`);
    res
      .status(500)
      .send({ success: false, meggage: "Error in delete customer" });
  }
};
const validateCustomer = async (req, res) => {
  try {
    // console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Crediantials required" });
    }
    const user = await Customer.findOne({ email: email });
    // console.log(user);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User can't exist" });
    }
    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch) {
      return res
        .status(401)
        .send({ success: false, message: "Wrong crediantials" });
    }
    const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      message: `Welcome ${user.email}`,
      role: user.role,
    });
  } catch (error) {
    console.log(`Validate user: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const destroyToken = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(`DestroyToken: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const id = req.data.user;
    const allCustomers = await Customer.aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "customer_id", // Matches your schema
          as: "transactions",
        },
      },
      {
        $addFields: {
          transactionCount: { $size: "$transactions" },
          totalIncome: {
            $sum: {
              $map: {
                input: "$transactions",
                as: "t",
                in: {
                  $cond: [
                    { $eq: ["$$t.type", "Income"] }, // ✅ Capital "I"
                    { $ifNull: ["$$t.amount", 0] },
                    0,
                  ],
                },
              },
            },
          },
          totalExpense: {
            $sum: {
              $map: {
                input: "$transactions",
                as: "t",
                in: {
                  $cond: [
                    { $eq: ["$$t.type", "Expense"] }, // ✅ Capital "E"
                    { $ifNull: ["$$t.amount", 0] },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          balance: { $subtract: ["$totalIncome", "$totalExpense"] },
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          profile_img: 1,
          transactionCount: 1,
          totalIncome: 1,
          totalExpense: 1,
          balance: 1,
        },
      },
    ]);
    // console.log(`customers: ${allCustomers}`);

    const customerData = await Customer.findOne({ _id: id });

    const transactionData = await Transaction.find({ customer_id: id });
    // console.log(transactionData);
    // console.log(customerData);
    if (!customerData) {
      return res.status(404).send({
        success: false,
        message: "No data",
      });
    }
    res.status(200).send({
      success: true,
      data: customerData,
      transaction: transactionData,
      customers: allCustomers,
    });
  } catch (error) {
    console.log(`Dashboard: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addCustomer,
  updateCustomer,
  showCustomer,
  deleteCustomer,
  validateCustomer,
  destroyToken,
  getDashboard,
};

const checkAdmin = (email) => {
  let data = email.split("@");
  console.log(data);
  if (data[1] === "admin.com") {
    return "admin";
  }
};
