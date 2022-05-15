const express = require("express");
const router = express.Router();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

module.exports = () => {
  //serving user login after killing session and logging out
  router.get("/", (request, response) => {
    request.session.destroy((err) => {
      if (err) {
        throw err;
      }
      response.render("user-login");
    });
  });
  return router;
};
