const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },

    lname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true
      },

    
    age: {
      type: String,
      required: true,
      trim: true,
      
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);