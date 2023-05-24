const { Joi, celebrate } = require('celebrate');
const { validatonUrl } = require('../utils');

const userFields = {
  userId: Joi.string().hex().length(24),
  about: Joi.string().min(2).max(30),
  name: Joi.string().min(2).max(30),
  avatar: Joi.string().custom(validatonUrl),
};

const getUserFields = celebrate({
  params: Joi.object({
    userId: userFields.userId.required(),
  }),
});

const updateUserFields = celebrate({
  body: Joi.object({
    name: userFields.name.required(),
    about: userFields.about.required(),
  }),
});

const updateUserAvatarFields = celebrate({
  body: Joi.object({ avatar: userFields.avatar.required() }),
});

module.exports = {
  common: userFields,
  validation: { getUserFields, updateUserFields, updateUserAvatarFields },
};
