const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Service name is required'],
	},
	description: {
		type: String,
		required: [true, 'Service description is required'],
	},
	amount: {
		type: Number,
		required: [true, 'Service amount is required'],
		min: [0, 'Amount cannot be negative'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ServiceType', ServiceSchema);
