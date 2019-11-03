const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.f_name = !isEmpty(data.f_name) ? data.f_name : "";
  data.l_name = !isEmpty(data.l_name) ? data.l_name : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

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
