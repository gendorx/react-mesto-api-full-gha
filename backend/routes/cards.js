const express = require('express');
const {
  createCard,
  getCards,
  removeLike,
  addLike,
  removeCard,
} = require('../controllers/cards');
const {
  cardFields: { createCardFields, actionCardFields },
} = require('../utils/validation');

const cards = express.Router();

cards.get('/', getCards);
cards.post('/', createCardFields, createCard);
cards.delete('/:cardId', actionCardFields, removeCard);
cards.put('/:cardId/likes', actionCardFields, addLike);
cards.delete('/:cardId/likes', actionCardFields, removeLike);

module.exports = cards;
