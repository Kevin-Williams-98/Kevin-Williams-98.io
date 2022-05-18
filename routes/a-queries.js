const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving a-queries
  router.get("/", (request, response) => {
    response.render("a-queries");
  });
  return router;
};
