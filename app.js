//import apiRouter from "./api";
//immediately refers to index file within folder
//const cookieSession = require("cookie-session");
const routes = require("./routes");
const CryptoJS = require("crypto-js");
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const react = require("react");
const reactDom = require("react-dom");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const MongoDBSession = require("connect-mongodb-session")(session);
//const Course = require("./models/course.js");
//const Admin = require("./models/admin.js");
//const Student = require("./models/student.js");
//const Instructor = require("./models/instructor.js");
//const Person = require("./person.js");
const MongoURI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

//<---------------connect to database ---------------->
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

console.log("This is crypto hash" + CryptoJS.SHA256("Message"));
//<--------------(Middleware)Things we need to help on app--------------------------->
const store = new MongoDBSession({
  uri: "mongodb+srv://kevin:Im-amazing@kings-college-remote.dryis.mongodb.net/Kings-College?retryWrites=true&w=majority",
  collection: "mySessions",
});
app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// Allows us to read request body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session control (if you dont have trust proxy doesnt work) keep in mind for future apps
app.set("trust proxy", 1);

//allows us to know what type of request are being sent.
app.use("/", (req, res, next) => {
  console.log("Request Type:", req.method);
  return next();
});
app.use("/", express.static(path.join(__dirname, "/public-html")));
console.log("This is path: " + __dirname + "/public-html");
app.use("/", routes());

//setting up ejs
app.use(expressLayouts);
//sets it to find index file instead of layout
app.set("layout", "index");
app.set("view engine", "ejs");

//importing all the public html files to be used
//app.use(express.static("public-html"));

module.exports = app;
