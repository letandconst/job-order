const express = require('express');

const UserRoutes = require('./api/user.route');
const MechanicRoutes = require('./api/mechanic.route');
const ProductRoutes = require('./api/product.route');
const JobRoutes = require('./api/job.route');
const ServiceTypeRoutes = require('./api/service-type.route');

const main = express.Router();

main.use('/api/user', UserRoutes);
main.use('/api/mechanic', MechanicRoutes);
main.use('/api/product', ProductRoutes);
main.use('/api/job', JobRoutes);
main.use('/api/service-type', ServiceTypeRoutes);

module.exports = main;
