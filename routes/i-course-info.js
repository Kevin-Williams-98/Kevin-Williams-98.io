const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving instructor course info
  router.get("/public-html/i-course-info.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/i-course-info.html"));
  });
  return router;
};
