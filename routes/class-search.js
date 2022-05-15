const express = require("express");
const router = express.Router();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

module.exports = () => {
  const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.render("user-login");
    }
  };
  //serving class search
  router.get("/", isAuth, (request, response) => {
    response.render("class-search");
  });
  return router;
};
