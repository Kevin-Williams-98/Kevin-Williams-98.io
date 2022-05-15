//const Course = require("./models/course.js");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const Admin = require("../models/admin.js");
const Student = require("../models/student.js");
const Instructor = require("../models/instructor.js");
const express = require("express");
const { json } = require("body-parser");
const { isFunction } = require("jquery");
const router = express.Router();
//const MongoURI = process.env.MONGODB_URI;

module.exports = () => {
  const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.render("user-login");
    }
  };
  const store = new MongoDBSession({
    uri: "mongodb+srv://kevin:Im-amazing@kings-college-remote.dryis.mongodb.net/Kings-College?retryWrites=true&w=majority",
    collection: "mySessions",
  });

  //serving student dash post
  router.post("/", (req, res) => {
    let emailCheck = req.body.email;
    let passwordCheck = req.body.password;
    let studentCheck = req.body.studentCheck2;
    let instructorCheck = req.body.instructorCheck2;

    console.log("This is request " + req);
    console.log(
      "This is email: " + emailCheck + " This is pw: " + passwordCheck
    );
    if (emailCheck != "") {
      console.log("gets pass empty email check");
      if (passwordCheck != "") {
        console.log("gets pass empty password check");
        if (studentCheck == "1") {
          //let studentInfo = {};
          console.log("gets pass student button select");
          let studentExist = Student.findOne({
            email: emailCheck,
            pw: passwordCheck,
          })
            .then((studentInfo) => {
              if (studentInfo == null) {
                res.render("user-login", { wrongLogin: "Wrong Login" });
                throw new Error("Student not found");
              }
              console.log(JSON.stringify(studentInfo));
              req.session.isAuth = true;
              res.render("student-dash", { allStudentInfo: studentInfo });
            })
            .catch((error) => {
              console.log(`${error.name}: ${error.message}`);
            });

          console.log("This is student exist: " + studentExist);
        } else if (instructorCheck == 1) {
          let instructorExist = Instructor.findOne({
            email: emailCheck,
            pw: passwordCheck,
          })
            .then((instructorInfo) => {
              if (instructorInfo == null) {
                res.render("user-login", { wrongLogin: "Wrong Login" });
                throw new Error("Instructor not found");
              }
              console.log(JSON.stringify(instructorInfo));
              req.session.isAuth = true;
              res.render("instructor-dash", {
                allInstructorInfo: instructorInfo,
              });
            })
            .catch((error) => {
              console.log(`${error.name}: ${error.message}`);
            });
          // console.log("This is student info: " + instructorInfo);

          //console.log("This is student exist: " + studentExist);
          console.log("This is instructor exist: " + instructorExist); /*
          if (instructorExist == null) {
            console.log("gets pass null check");
            res.render("user-login");
          } else {
            res.sendFile(
              path.join(__dirname, "/public-html/instructor-dash.html")
            );
          }
          */
        } else {
          let adminExist = Admin.findOne({
            email: emailCheck,
            pw: passwordCheck,
          })
            .then((adminInfo) => {
              if (adminInfo == null) {
                res.render("user-login", { wrongLogin: "Wrong Login" });
                throw new Error("Admin not found");
              }
              console.log(JSON.stringify(adminInfo));
              req.session.isAuth = true;
              res.render("admin-dash", {
                allInstructorInfo: adminInfo,
              });
            })
            .catch((error) => {
              console.log(`${error.name}: ${error.message}`);
            });
        }
      }
    }
  });

  // just a regular get
  router.get("/", isAuth, (request, response, next) => {
    console.log("This is request: " + request.body);
    //response.sendFile(path.join(__dirname, "/public-html/student-dash.html"));
    return response.render("student-dash");
  });

  return router;
};
