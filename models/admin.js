const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
    },

    lName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    pw: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
