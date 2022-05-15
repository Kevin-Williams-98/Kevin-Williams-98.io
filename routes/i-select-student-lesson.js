const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving i select student lesson
  router.get(
    "/public-html/i-select-student-lesson.html",
    (request, response, next) => {
      response.sendFile(
        path.join(__dirname, "/public-html/i-select-student-lesson.html")
      );
    }
  );
  return router;
};
