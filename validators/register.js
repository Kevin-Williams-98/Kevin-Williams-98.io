const Validator = require("fastest-validator");
const v = new Validator();

const Schema = {
  email: { type: "string" },
  password: { type: "string" },
};

const checker = v.compile(schema);

module.exports = checker;
