//----------------------------VALIDATION-----------------------------------
const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().min(4).required(),
    user_email: Joi.string().min(8).required().email(),
    admin: Joi.boolean(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    user_email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
