const { Joi, celebrate } = require('celebrate');
const { validatonUrl } = require('../utils');

const cardsFields = {
  cardId: Joi.string().required().hex().length(24),
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().custom(validatonUrl),
};

const createCardFields = celebrate({
  body: Joi.object({
    name: cardsFields.name,
    link: cardsFields.link,
  }),
});

const actionCardFields = celebrate({
  params: {
    cardId: cardsFields.cardId,
  },
});

module.exports = {
  validation: { createCardFields, actionCardFields },
};
