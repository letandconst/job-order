const Product = require('../models/product.model');
const cloudinary = require('cloudinary').v2;

exports.addProduct = async (req, res) => {
	try {
		const { name, description, price, stockQuantity } = req.body;
		let productImage;

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, { folder: 'images/products' });
			productImage = result.secure_url;
		} else {
			productImage = 'https://www.recia.fr/wp-content/uploads/2019/09/no_image.png';
		}

		if (!name || !description || price === undefined || stockQuantity === undefined) {
			return res.status(400).json({ message: 'All fields are required ⚠' });
		}

		if (!Number.isFinite(parseFloat(price))) {
			return res.status(400).json({ message: 'Invalid price format' });
		}

		const newProduct = new Product({
			name,
			description,
			price: parseFloat(price),
			stockQuantity,
			productImage,
		});

		await newProduct.save();
		res.json({
			message: 'Product successfully Added ✔',
		});
	} catch (error) {
		res.status(500).json({ message: 'Error creating product' });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { stockQuantity, ...updateData } = req.body;

		updateData.updatedAt = new Date();

		if (stockQuantity !== undefined) {
			await Product.findByIdAndUpdate(id, { stockQuantity });
		}

		await Product.findByIdAndUpdate(id, updateData);

		res.json({ message: 'Product updated successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error updating product' });
	}
};

exports.getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching product' });
	}
};

exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching products' });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting product' });
	}
};
