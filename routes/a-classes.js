const express = require("express");
const router = express.Router();
const Course = require("../models/course.js");
module.exports = () => {
  //serving a-classes
  router.get("/", (request, response) => {
    Course.find().then((allCoursesTemp) => {
      console.log("All courses server side: " + allCoursesTemp);
      //let allCourses = allCoursesTemp;
      const allCourses = {
        _id: allCoursesTemp.__id,
        name: allCoursesTemp.name,
        term: allCoursesTemp.term,
        iD: allCoursesTemp.iD,
        subject: allCoursesTemp.subject,
        instructors: allCoursesTemp.instructors,
        roster: allCoursesTemp.roster,
      };

      console.log("This is typeof " + typeof allCourses);
      delete allCourses.createdAt;
      delete allCourses.updatedAt;

      console.log("All courses server side 2: " + allCourses);
      response.render("a-classes", { theCourses: allCoursesTemp });
    });
  });
  return router;
};
