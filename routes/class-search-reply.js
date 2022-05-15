const express = require("express");
const router = express.Router();

module.exports = () => {
  //serving class search relpy
  router.get(
    "/public-html/class-search-reply.html",
    (request, response, next) => {
      response.sendFile(
        path.join(__dirname, "/public-html/class-search-reply.html")
      );
    }
  );
  return router;
};
