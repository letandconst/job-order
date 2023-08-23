const express = require('express');
const app = express.Router();

const user = require('../../controllers/user.controller');

app.post('/register', user.register);

app.post('/login', user.login);

app.patch('/reset-password/:id', user.reset_password);

app.delete('/delete-user/:id', user.delete);

module.exports = app;
