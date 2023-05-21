const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { AuthError, ConfictError } = require('../utils/errors');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/constants');

const authError = new AuthError('передан неверный логин или пароль');

async function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      about,
      avatar,
      password: hashPassword,
    });

    res.status(HTTP_STATUS_CREATED).send({
      ...user.toJSON(),
      password: undefined,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(
        new ConfictError(
          'при регистрации указан email, который уже существует на сервере',
        ),
      );
    } else {
      next(err);
    }
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select({ password: 1 });

    if (!user) throw authError;

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw authError;

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.send({
      token,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser,
};
