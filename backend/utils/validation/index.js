const { validation: authFields } = require('./auth');
const { validation: userFields } = require('./users');
const { validation: cardFields } = require('./cards');

module.exports = {
  authFields,
  userFields,
  cardFields,
};
