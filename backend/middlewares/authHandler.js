const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors');

const { JWT_SECRET } = require('../utils/constants');

const authErrorMessage = 'необходима авторизация';

function authHandler(req, res, next) {
  let authorization = req.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(authErrorMessage));
    return;
  }

  authorization = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(authorization, JWT_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError(authErrorMessage));
  }
}

module.exports = authHandler;
