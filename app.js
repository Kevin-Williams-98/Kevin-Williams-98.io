const express = require("express");
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
  "/images",
  express.static(__dirname + "/images")

  //express.urlencoded({
  //extended: true,
  // })
);
//const fs = require("fs");
const path = require("path");
app.get("/", (request, response) => {
  // const fileName = "../index.html";
  //fs.writeFileSync(fileName, request.body.userinput);
  response.sendFile(__dirname + "/index.html");

  //response.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
  console.log(__dirname);
});
