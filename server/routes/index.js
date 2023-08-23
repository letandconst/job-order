const express = require('express');

const UserRoutes = require('./api/user.route');
const MechanicRoutes = require('./api/mechanic.route');

const main = express.Router();

main.use('/api/user', UserRoutes);
main.use('/api/mechanic', MechanicRoutes);

module.exports = main;
