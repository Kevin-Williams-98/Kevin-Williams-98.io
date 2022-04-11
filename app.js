const CryptoJS = require("crypto-js");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const Course = require("./models/course.js");
const Admin = require("./models/admin.js");
const Student = require("./models/student.js");
const Instructor = require("./models/instructor.js");
//const Person = require("./person.js");
const MongoURI = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://kevin:Im-amazing@kings-college-remote.dryis.mongodb.net/Kings-College?retryWrites=true&w=majority",
    { useNewURLParser: true, useUnifiedTopology: true }
  )
  .then((result) =>
    app.listen(PORT, () => {
      console.log("App listening on port 3000 and db is connected");
      console.log(__dirname);
    })
  )
  .catch((err) => console.log(err));
//const db=require('./db.js');

console.log("This is crypto hash" + CryptoJS.SHA256("Message"));

// Allows us to read request body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});
app.use(
  //"/kevin-williams-98io",
  express.static(path.join(__dirname, "./public-html")),
  (req, res, next) => {
    console.log("entire directory loaded");
    next();
  }
);

//serving index
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/index.html"));
});

app.post("/public-html/user-login.html", (req, res) => {
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
              console.log("Entry checks out now checking against the database");
              if (studentCheck == 1) {
                const myStudentCredentials = new Student({
                  fName: firstName,
                  lName: lastName,
                  email: email,
                  pw: password,
                  courseIDList: [],
                });
                myStudentCredentials
                  .save()
                  .then((result) =>
                    res.sendFile(
                      path.join(__dirname, "/public-html/user-login.html")
                    )
                  )
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                const myInstructorCredentials = new Instructor({
                  fName: firstName,
                  lName: lastName,
                  email: email,
                  pw: password,
                  courseIDList: [],
                });
                myInstructorCredentials
                  .save()
                  .then((result) =>
                    res.sendFile(
                      path.join(__dirname, "/public-html/user-login.html")
                    )
                  )
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

//serving student dash
app.post("/public-html/student-dash.html", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let studentCheck = req.body.studentCheck2;
  let instructorCheck = req.body.instructorCheck2;

  console.log("This is request " + req);
  console.log("This is email: " + email + " This is pw: " + password);
  if (email != "") {
    console.log("gets pass empty email check");
    if (password != "") {
      console.log("gets pass empty password check");
      if (studentCheck == "1") {
        console.log("gets pass student button select");
        let studentExist = Student.findOne({ email: email, pw: password });
        if (studentExist == null) {
          console.log("gets pass null check");
          res.sendFile(path.join(__dirname, "/public-html/user-login.html"));
        } else {
          res.sendFile(path.join(__dirname, "/public-html/student-dash.html"));
        }
      } else if (instructorCheck == 1) {
        let instructorExist = Instructor.findOne({
          email: email,
          pw: password,
        });
        if (instructorExist == null) {
          console.log("gets pass null check");
          res.sendFile(path.join(__dirname, "/public-html/user-login.html"));
        } else {
          res.sendFile(
            path.join(__dirname, "/public-html/instructor-dash.html")
          );
        }
      } else {
        let adminExist = Admin.findOne({ email: email, pw: password });
        if (adminExist == null) {
          console.log("gets pass null check");
          res.sendFile(path.join(__dirname, "/public-html/user-login.html"));
        } else {
          res.sendFile(path.join(__dirname, "/public-html/admin-dash.html"));
        }
      }
    }
  }
});
app.get("/public-html/student-dash.html", (request, response) => {
  console.log("This is request: " + request.body);
  response.sendFile(path.join(__dirname, "/public-html/student-dash.html"));
});
//serving login
app.get("/public-html/user-login.html", (request, response) => {
  console.log("This is request: " + request.body);
  response.sendFile(path.join(__dirname, "/public-html/user-login.html"));
});
//serving a-classes
app.get("/public-html/a-classes.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/a-classes.html"));
});
//serving a-queries
app.get("/public-html/a-queries.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/a-queries.html"));
});
//serving admin dash
app.get("/public-html/admin-dash.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/admin-dash.html"));
});
//serving class search relpy
app.get("/public-html/class-search-reply.html", (request, response) => {
  response.sendFile(
    path.join(__dirname, "/public-html/class-search-reply.html")
  );
});
//serving class info
app.get("/public-html/class-info.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/class-info.html"));
});
//serving class search
app.get("/public-html/class-search.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/class-search.html"));
});
//serving course work
app.get("/public-html/course-work.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/course-work.html"));
});
//serving instructor course info
app.get("/public-html/i-course-info.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/i-course-info.html"));
});
//serving i course lessons
app.get("/public-html/i-course-lessons.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/i-course-lessons.html"));
});
//serving create course
app.get("/public-html/i-create-course.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/i-create-course.html"));
});
//serving grade lesson
app.get("/public-html/i-grade-lesson.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/i-grade-lesson.html"));
});
//serving i select student lesson
app.get("/public-html/i-select-student-lesson.html", (request, response) => {
  response.sendFile(
    path.join(__dirname, "/public-html/i-select-student-lesson.html")
  );
});
//serving instructor dash
app.get("/public-html/instructor-dash.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/instructor-dash.html"));
});
//serving roster management
app.get("/public-html/roster-management.html", (request, response) => {
  response.sendFile(
    path.join(__dirname, "/public-html/roster-management.html")
  );
});

//serving  user signup
app.get("/public-html/user-signup.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/user-signup.html"));
});
app.get("/public-html/index.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/index.html"));
});
