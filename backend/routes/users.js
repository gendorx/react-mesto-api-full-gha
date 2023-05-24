const express = require('express');

const users = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');
const {
  userFields: { getUserFields, updateUserFields, updateUserAvatarFields },
} = require('../utils/validation');

users.get('/', getAllUsers);
users.get('/me', getCurrentUser);
users.get('/:userId', getUserFields, getUserById);
users.patch('/me', updateUserFields, updateUser);
users.patch('/me/avatar', updateUserAvatarFields, updateUser);

module.exports = users;
