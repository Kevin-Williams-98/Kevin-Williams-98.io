const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving i course lessons
  router.get(
    "/public-html/i-course-lessons.html",
    (request, response, next) => {
      response.sendFile(
        path.join(__dirname, "/public-html/i-course-lessons.html")
      );
    }
  );
  return router;
};
