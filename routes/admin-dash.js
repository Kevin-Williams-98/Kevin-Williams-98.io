const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving admin dash
  router.get("/", (request, response) => {
    response.render("admin-dash");
  });
  return router;
};
