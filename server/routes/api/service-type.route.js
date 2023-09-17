const express = require('express');
const app = express.Router();

const service = require('../../controllers/service-type.controller');

app.get('/', service.getAllServices);

app.post('/add', service.addServiceType);

app.put('/:id', service.updateServiceType);

app.delete('/:id', service.deleteServiceType);

module.exports = app;
