const express = require('express');

const { createUser, loginUser } = require('../controllers/auth');
const {
  authFields: { loginUserFields, createUserFields },
} = require('../utils/validation');

const auth = express.Router();

auth.post('/signup', createUserFields, createUser);
auth.post('/signin', loginUserFields, loginUser);

module.exports = auth;
