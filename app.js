const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

/*

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

*/
// Allows us to read request body contents
app.use(
  //"/kevin-williams-98io",
  express.static(path.join(__dirname,"/kevin-williams-98io/public-html"))

  //express.urlencoded({
  //extended: true,
  // })
);

app.get("/", (request, response) => {
  // const fileName = "../index.html";
  //fs.writeFileSync(fileName, request.body.userinput);
  console.log(request.url)
  //response.sendFile(__dirname + request.url);

  response.sendFile(path.join(__dirname, "./public-html/index.html"));
});

app.get("/user-login.html", (request, response,html) => {
  // const fileName = "../index.html";
  //fs.writeFileSync(fileName, request.body.userinput);
  console.log(request.url)
  //response.sendFile(__dirname + request.url);

  response.sendFile(path.join(__dirname, "/public-html/user-login"));
});

app.listen(PORT, () => {
  console.log("App listening on port 3000");
  console.log(__dirname);
});
