const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving  user signup
  router.get("/", (request, response, next) => {
    response.render("index");
  });
  return router;
};
