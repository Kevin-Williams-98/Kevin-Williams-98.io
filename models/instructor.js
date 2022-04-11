const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
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
    courseIDList: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
