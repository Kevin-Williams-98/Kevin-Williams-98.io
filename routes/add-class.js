const express = require("express");
const router = express.Router();
const Course = require("../models/course.js");
module.exports = () => {
  //serving create course
  router.post("/", (request, response, next) => {
    console.log(
      "This is request body in add class " + JSON.stringify(request.body)
    );

    let termTest = request.body.term;
    let subjectTest = request.body.subject;
    let courseNameTest = request.body.courseName;
    let courseNumber = request.body.courseNumber;

    const theCourse = new Course({
      term: termTest,
      iD: courseNumber,
      subject: subjectTest,
      name: courseNameTest,
    });
    let courseExist = Course.findOne({
      iD: courseNumber,
    }).then((courseInfo) => {
      if (courseInfo == null) {
        theCourse.save().then((result) => {
          response.render("instructor-dash", {
            courseStatus: "Course was added",
          });
        });
      } else {
        response.render("i-create-course", {
          courseStatus: "Course already exist",
        });
      }
    });
  });
  return router;
};
