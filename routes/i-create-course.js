const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving create course
  router.get("/", (request, response, next) => {
    response.render("i-create-course", { courseStatus: "No course" });
  });
  return router;
};
