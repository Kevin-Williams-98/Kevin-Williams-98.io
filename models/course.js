const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    term: {
      type: String,
      required: false,
    },

    iD: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    instructors: {
      type: [],
      required: true,
    },

    roster: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

/*
class Course{
  constructor(cName,cterm,cID,cSubject,cInstructors)
  {
    this.cName=cName;
    this.cterm=cterm;
    this.cID=cID;
    this.cSubject=cSubject;
    this.cInstructors=cInstructors;
  }
}
module.exports = Course;
*/
