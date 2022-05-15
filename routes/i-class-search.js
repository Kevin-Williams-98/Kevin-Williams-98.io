const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving i class search
  router.get("/", (request, response, next) => {
    response.render("i-class-search");
  });
  return router;
};
