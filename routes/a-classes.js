const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving a-classes
  router.get("/public-html/a-classes.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/a-classes.html"));
  });
  return router;
};
