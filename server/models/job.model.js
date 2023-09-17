const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	ProductID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
	Quantity: Number,
});

const JobSchema = new mongoose.Schema({
	customerName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	carModel: {
		type: String,
		required: true,
	},
	plateNumber: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	assignedMechanic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Mechanic',
		required: true,
	},
	products: [productSchema],
	workRequested: [
		{
			request: String,
			labor: Number,
		},
	],
	totalLabor: { type: Number, default: 0 },
	totalProductPrice: { type: Number, default: 0 },
	totalPrice: { type: Number, default: 0 },
	status: {
		type: String,
		default: 'Pending',
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);
