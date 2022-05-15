const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving instructor dash
  router.get("/", (request, response, next) => {
    response.render("instructor-dash");
  });
  return router;
};
