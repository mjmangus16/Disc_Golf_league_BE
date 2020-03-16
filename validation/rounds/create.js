const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : "";

  if (validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
