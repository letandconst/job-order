const mongoose = require('mongoose');

const MechanicSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
	},
	mobileNumber: {
		type: String,
		required: [true, 'Mobile number is required'],
		validate: {
			validator: function (v) {
				return /\d{10}/.test(v);
			},
			message: 'Mobile number must be a 10-digit number',
		},
	},
	totalJobs: {
		type: Number,
		default: 0,
	},
	profileImage: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Mechanic', MechanicSchema);
