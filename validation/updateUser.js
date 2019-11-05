const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.f_name = !isEmpty(data.f_name) ? data.f_name : "";
  data.l_name = !isEmpty(data.l_name) ? data.l_name : "";

  if (validator.isEmpty(data.f_name)) {
    errors.f_name = "First name field is required";
  }

  if (validator.isEmpty(data.l_name)) {
    errors.l_name = "Last name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
