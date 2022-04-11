const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
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

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
