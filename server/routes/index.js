const express = require('express');

const UserRoutes = require('./api/user.route');
const MechanicRoutes = require('./api/mechanic.route');
const ProductRoutes = require('./api/product.route');

const main = express.Router();

main.use('/api/user', UserRoutes);
main.use('/api/mechanic', MechanicRoutes);
main.use('/api/product', ProductRoutes);

module.exports = main;
