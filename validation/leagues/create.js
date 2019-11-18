const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.days = !isEmpty(data.days) ? data.days : "";
  data["length"] = !isEmpty(data["length"]) ? data["length"] : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "League name field is required";
  }

  if (validator.isEmpty(data.type)) {
    errors.type = "League type field is required";
  }

  if (validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  if (validator.isEmpty(data.zip)) {
    errors.zip = "Zip code field is required";
  }

  if (validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (validator.isEmpty(data.year)) {
    errors.year = "Year field is required";
  }

  if (validator.isEmpty(data.days)) {
    errors.days = "Days played field is required";
  }

  if (validator.isEmpty(data["length"])) {
    errors["length"] = "Season length field is required";
  }

  if (validator.isEmpty(data.contact)) {
    errors.contact = "Contact information field is required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "League description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
