const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, 'Quantity must be at least 1'],
	},
});

const JobSchema = new mongoose.Schema({
	customerName: {
		type: String,
		required: [true, 'Customer name is required'],
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
	},
	carModel: {
		type: String,
		required: [true, 'Car model is required'],
	},
	plateNumber: {
		type: String,
		required: [true, 'Plate number is required'],
		unique: true,
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
	assignedMechanic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Mechanic',
		required: [true, 'Assigned mechanic is required'],
	},
	products: [ProductSchema],
	workRequested: [
		{
			request: String,
			labor: {
				type: Number,
				default: 0,
			},
		},
	],
	totalLabor: {
		type: Number,
		default: 0,
	},
	totalProductPrice: {
		type: Number,
		default: 0,
	},
	totalPrice: {
		type: Number,
		default: 0,
	},
	status: {
		type: String,
		default: 'Pending',
		enum: ['Pending', 'In-Progress', 'Completed'],
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

module.exports = mongoose.model('Job', JobSchema);
