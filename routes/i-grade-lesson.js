const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving grade lesson
  router.get("/public-html/i-grade-lesson.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/i-grade-lesson.html"));
  });
  return router;
};
