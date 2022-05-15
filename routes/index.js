const express = require("express");
const router = express.Router();
const path = require("path");
const aClassesRoute = require("./a-classes");
const aQueriesRoute = require("./a-queries");
const adminDashRoute = require("./admin-dash");
const classInfoRoute = require("./class-info");
const classSearchReplyRoute = require("./class-search-reply");
const classSearchRoute = require("./class-search");
const courseWorkRoute = require("./course-work");
const iCourseInfoRoute = require("./i-course-info");
const iCourseLessonRoute = require("./i-course-lesson");
const iCreateCourseRoute = require("./i-create-course");
const iGradeLessonRoute = require("./i-grade-lesson");
const iSelectStudentLessonRoute = require("./i-select-student-lesson");
const instructorDashRoute = require("./instructor-dash");
const rosterManagementRoute = require("./roster-management");
const studentDashRoute = require("./student-dash");
const userloginRoute = require("./user-login");
const userSignupRoute = require("./user-signup");
const logOutRoute = require("./logout");
const iClassSearchRoute = require("./i-class-search");
module.exports = () => {
  //<----------- Serving files ------------------------------------->
  //serving index
  router.get("/", (request, response) => {
    //request.session.isAuth = true;
    //console.log(request.session.id);
    return response.render("index");
    console.log("Get statement for index called");
    // response.sendFile(path.join(__dirname, "/public-html/index.html"));
  });
  //
  router.use("/a-classes", aClassesRoute());
  router.use("/a-queries", aQueriesRoute());
  router.use("/admin-dash", adminDashRoute());
  router.use("/class-info", classInfoRoute());
  router.use("/class-search-reply", classSearchReplyRoute());
  router.use("/class-search", classSearchRoute());
  router.use("/course-work", courseWorkRoute());
  router.use("/i-course-info", iCourseInfoRoute());
  router.use("/i-course-lesson", iCourseLessonRoute());
  router.use("/i-create-course", iCreateCourseRoute());
  router.use("/i-grade-lesson", iGradeLessonRoute());
  router.use("/i-Select-student-lesson", iSelectStudentLessonRoute());
  router.use("/instructor-dash", instructorDashRoute());
  router.use("/roster-management", rosterManagementRoute());
  router.use("/student-dash", studentDashRoute());
  router.use("/user-login", userloginRoute());
  router.use("/user-signup", userSignupRoute());
  router.use("/logout", logOutRoute());
  router.use("/i-class-search", iClassSearchRoute());
  return router;
};
