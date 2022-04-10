const CryptoJS=require("crypto-js");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const Course = require('./course.js');
const Person = require('./person.js')
//const db=require('./db.js');

console.log("This is crypto hash" +CryptoJS.SHA256("Message"));
//const database=new db();

const Database = require("@replit/database");
const db = new Database();

async function insert(key, value) {
  await db.set(key, value)
}

async function getKeyValue(key) {
  let value = await db.get(key);
  return value;
}
async function deleteKey(key) {
  await db.delete(key);

}
async function listKeys() {
  let keys = await db.list();
  return keys;
}

async function listKeyPrefix(prefix) {
  let matches = await db.list(prefix);
  return matches;
}

insert('kevin','williams');
console.log(listKeys());
console.log('Database Access Link')
console.log(process.env.REPLIT_DB_URL);


//key admi or stud or inst  + email+ hashedpw
//query





















// Allows us to read request body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log('Request Type:', req.method)
  next();
})
app.use(
  //"/kevin-williams-98io",
  express.static(path.join(__dirname, "./public-html")), (req, res, next) => {

    console.log('entire directory loaded');
    next();

  });

//serving index
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/index.html"));
});

app.post('/public-html/user-login.html', (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  let email = req.body.email;
  let password = req.body.password;
  let studentCheck = req.body.studentCheck;
  let instructorCheck = req.body.instructorCheck;
  let alreadyHaveAccountButtonStatus = req.body.alreadyHaveAccountBtn;
  let signUpButtonStatus = req.body.signUpBtn;
  console.log(`LastName: ${lastName} FirstName: ${firstName} Email: ${email} Password: ${password} StudentCheck: ${studentCheck} InstructorCheck: ${instructorCheck} alreadyHaveAccountButtonStatus: ${alreadyHaveAccountButtonStatus} signUpButtonStatus: ${signUpButtonStatus}   `);

  //Authenticating potential sign up 
  function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
  }
  let signUpError = 'No Error';
  if (firstName != '' && onlyLetters(firstName) == true) {
    console.log('firstname checks out');

    if (lastName != '' && onlyLetters(lastName) == true) {
      console.log('lastname checks out');

      if (email != '') {
        if (email.includes('@') && email.includes('.')) {
          if (email.indexOf('@') < email.indexOf('.')) {
            console.log('email is valid');
            if (password.length >= 8) {
              console.log('password is valid');
              if (studentCheck == '1' || instructorCheck == '1') {
                console.log('Checked a box for instructor or student')
                console.log('Entry checks out now checking against the database');

                
              }
              else {
                signUpError = 'Plese select student or instructor';
              }
            }
            else {
              signUpError = 'Enter Valid Password more than 8 letters';
            }
          }
          else {
            signUpError = 'Enter Valid Email Address';
          }
        }
        else {
          signUpError = 'Enter Valid Email Address';
        }

      }
      else {
        signUpError = 'Please Enter an Email address';
      }
    }
    else {
      signUpError = 'Enter Valid Last Name';
    }
  }
  else {
    signUpError = 'Enter Valid First Name';
  }

  res.sendFile(path.join(__dirname, "/public-html/user-login.html"));
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
  response.sendFile(path.join(__dirname, "/public-html/class-search-reply.html"));
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
  response.sendFile(path.join(__dirname, "/public-html/i-select-student-lesson.html"));
});
//serving instructor dash
app.get("/public-html/instructor-dash.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/instructor-dash.html"));
});
//serving roster management
app.get("/public-html/roster-management.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/roster-management.html"));
});
//serving student dash
app.get("/public-html/student-dash.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/student-dash.html"));
});
//serving  user signup
app.get("/public-html/user-signup.html", (request, response) => {
  response.sendFile(path.join(__dirname, "/public-html/user-signup.html"));
});



app.listen(PORT, () => {
  console.log("App listening on port 3000");
  console.log(__dirname);
});
