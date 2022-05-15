const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving class info
  router.get("/public-html/class-info.html", (request, response, next) => {
    response.sendFile(path.join(__dirname, "/public-html/class-info.html"));
  });
  return router;
};
