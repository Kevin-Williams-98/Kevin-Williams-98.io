const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving roster management
  router.get(
    "/public-html/roster-management.html",
    (request, response, next) => {
      response.sendFile(
        path.join(__dirname, "/public-html/roster-management.html")
      );
    }
  );
  return router;
};
