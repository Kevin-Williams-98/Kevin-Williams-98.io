const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving course work
  router.get("/public-html/course-work.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/course-work.html"));
  });
  return router;
};
