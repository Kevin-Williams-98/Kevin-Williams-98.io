const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving admin dash
  router.get("/public-html/admin-dash.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/admin-dash.html"));
  });
  return router;
};
