const express = require('express');
const app = express.Router();
const multer = require('multer');

const product = require('../../controllers/product.controller');

const storage = multer.diskStorage({
	destination: './public/uploads/products',
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, file.fieldname + '-' + fileName);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/webp') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	},
});

app.get('/', product.getAllProducts);

app.get('/:id', product.getProduct);

app.post('/add', upload.single('productImage'), product.addProduct);

app.put('/:id', upload.single('productImage'), product.updateProduct);

app.delete('/:id', product.deleteProduct);

module.exports = app;
