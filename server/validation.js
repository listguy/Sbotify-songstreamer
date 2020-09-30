//Helper Validation file using Joi library
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });

  return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
