const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim:true,
      required: [true,"Name is required"],
      min:[2,"Name must be of two character"]
    },
    email: {
      type: String,
      trim:true,
      required:  [true,"Email is required"],
      unique: [true,"Email already exists"],
    },
    password: {
      type: String,
      trim:true,
      required: [true,"Password is required"],
    },
    role:{
      type:String,
      enum:["customer","admin"],
      default:"customer"
    },
    profile_img:{
      type:String,
      default:"https://bootdey.com/img/Content/avatar/avatar7.png"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
