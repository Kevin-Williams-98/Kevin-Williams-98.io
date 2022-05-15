const Course = require("../models/course.js");
const Admin = require("../models/admin.js");
const Student = require("../models/student.js");
const Instructor = require("../models/instructor.js");
const express = require("express");
const router = express.Router();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

module.exports = () => {
  const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.render("user-login");
    }
  };

  //serving login
  router.get("/", (request, response) => {
    console.log("This is request: " + request.body);
    console.log("Went for user login page");
    console.log("This is response: " + response.body);
    return response.render("user-login");
  });

  //sign in and then being redirected to sign in page
  router.post("/", (req, res) => {
    console.log("post statement to login called");
    let firstName = req.body.first;
    let lastName = req.body.last;
    let email = req.body.email;
    let password = req.body.password;
    let studentCheck = req.body.studentCheck;
    let instructorCheck = req.body.instructorCheck;
    let alreadyHaveAccountButtonStatus = req.body.alreadyHaveAccountBtn;
    let signUpButtonStatus = req.body.signUpBtn;
    console.log(
      `LastName: ${lastName} FirstName: ${firstName} Email: ${email} Password: ${password} StudentCheck: ${studentCheck} InstructorCheck: ${instructorCheck} alreadyHaveAccountButtonStatus: ${alreadyHaveAccountButtonStatus} signUpButtonStatus: ${signUpButtonStatus}   `
    );

    //Authenticating potential sign up
    function onlyLetters(str) {
      return /^[a-zA-Z]+$/.test(str);
    }

    function ValidateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      //alert("You have entered an invalid email address!");
      return false;
    }

    let signUpError = "No Error";
    if (firstName != "" && onlyLetters(firstName) == true) {
      console.log("firstname checks out");

      if (lastName != "" && onlyLetters(lastName) == true) {
        console.log("lastname checks out");

        if (email != "") {
          if (ValidateEmail(email) == true) {
            console.log("email is valid");
            if (password.length >= 8) {
              console.log("password is valid");
              if (studentCheck == "1" || instructorCheck == "1") {
                console.log("Checked a box for instructor or student");
                console.log(
                  "Entry checks out now checking against the database"
                );
                if (studentCheck == 1) {
                  const myStudentCredentials = new Student({
                    fName: firstName,
                    lName: lastName,
                    email: email,
                    pw: password,
                    courseIDList: [],
                  });
                  let studentAlreadyExist1 = Student.findOne({
                    pw: password,
                  });
                  let studentAlreadyExist2 = Student.findOne({
                    email: email,
                  });
                  console.log(
                    "This is student already exist 1:" + studentAlreadyExist1
                  );
                  console.log(
                    "This is student already exist 2:" + studentAlreadyExist2
                  );
                  let pwCheck;
                  let emailCheck;

                  studentAlreadyExist1
                    .then((studentInfo1) => {
                      if (studentInfo1 == null) {
                        pwCheck = null;
                        studentAlreadyExist2.then((studentInfo2) => {
                          if (studentInfo2 == null) {
                            emailCheck = null;
                            myStudentCredentials
                              .save()
                              .then((result) => res.render("user-login"))

                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        });
                      }
                    })
                    .then(() => {
                      res.render("index", { userExist: "User already exist" });
                    });
                  /*
                    {
                    myStudentCredentials
                      .save()
                      .then((result) => res.render("user-login"))

                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    res.render("index", {
                      alreadyExist: "Student already exist",
                    });
                  } */
                } else if (instructorCheck == 1) {
                  const myInstructorCredentials = new Instructor({
                    fName: firstName,
                    lName: lastName,
                    email: email,
                    pw: password,
                    courseIDList: [],
                  });
                  myInstructorCredentials
                    .save()
                    .then((result) => res.render("user-login"))
                    .catch((err) => {
                      console.log(err);
                    });
                }

                /*
                const myAdminCredentials = new Admin({
                  fName: firstName,
                  lName: lastName,
                  email: email,
                  pw: password,
                });
  
                myAdminCredentials
                  .save()
                  .then((result) => res.send(result))
                  .catch((err) => {
                    console.log(err);
                  });
  
                  */
              } else {
                signUpError = "Plese select student or instructor";
                // alert(signUpError);
              }
            } else {
              signUpError = "Enter Valid Password more than 8 letters";
              // alert(signUpError);
            }
          } else {
            signUpError = "Enter Valid email 2";
            // alert(signUpError);
          }
        } else {
          signUpError = "Enter Valid Email Address";
          //alert(signUpError);
        }
      } else {
        signUpError = "Enter Valid Last Name";
        // alert(signUpError);
      }
    } else {
      signUpError = "Enter Valid First Name";
      // alert(signUpError);
    }
    console.log("Sign up error: " + signUpError);
    //res.sendFile(path.join(__dirname, "/public-html/user-login.html"));
  });
  return router;
};
