const mongoose = require('mongoose');

const MechanicSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	totalJobs: Number,
	profileImage: String,
	createdAt: String,
});

module.exports = mongoose.model('Mechanic', MechanicSchema);
