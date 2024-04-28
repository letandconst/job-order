const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is required'],
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Product description is required'],
	},
	price: {
		type: Number,
		required: [true, 'Product price is required'],
		min: 0,
	},
	stockQuantity: {
		type: Number,
		required: [true, 'Stock quantity is required'],
		min: 0,
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

module.exports = mongoose.model('Product', ProductSchema);
