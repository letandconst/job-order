const express = require('express');

const UserRoutes = require('./api/user.route');

const main = express.Router();

main.use('/api/user', UserRoutes);

module.exports = main;
