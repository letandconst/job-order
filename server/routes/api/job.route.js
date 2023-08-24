const express = require('express');
const app = express.Router();

const job = require('../../controllers/job.controller');

app.get('/:id', job.getJobOrder);

app.get('/', job.getAllJobOrder);

app.post('/add', job.addJobOrder);

app.put('/update/:id', job.updateJobOrder);

app.delete('/:id', job.deleteJobOrder);

module.exports = app;
