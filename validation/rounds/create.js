const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : "";
  data.type = !isEmpty(data.type) ? data.type : "";

  if (validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  if (validator.isEmpty(data.type)) {
    errors.type = "Type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
