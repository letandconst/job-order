const express = require('express');
const users = express.Router();

const user = require('../../controllers/user.controller');

users.post('/register', user.register);

users.post('/login', user.login);

users.patch('/reset-password/:id', user.reset_password);

users.delete('/delete-user/:id', user.delete);

module.exports = users;
