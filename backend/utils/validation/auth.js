const { Joi, celebrate } = require('celebrate');
const { validationEmail } = require('../utils');
const { common: userFields } = require('./users');

const authFields = {
  email: Joi.string().custom(validationEmail).required(),
  password: Joi.string().required(),
};

const loginUserFields = celebrate({
  body: Joi.object(authFields),
});

const createUserFields = celebrate({
  body: Joi.object({
    ...authFields,
    name: userFields.name,
    about: userFields.about,
    avatar: userFields.avatar,
  }),
});

module.exports = {
  validation: { createUserFields, loginUserFields },
};
