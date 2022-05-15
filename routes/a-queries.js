const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving a-queries
  router.get("/public-html/a-queries.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/a-queries.html"));
  });
  return router;
};
