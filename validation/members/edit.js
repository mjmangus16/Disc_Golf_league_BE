const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateInput(data) {
  let errors = {};
  console.log(data);

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "That is not a valid email address";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
