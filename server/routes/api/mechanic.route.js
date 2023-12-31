const express = require('express');
const app = express.Router();
const multer = require('multer');

const mechanic = require('../../controllers/mechanic.controller');

const storage = multer.diskStorage({
	destination: './public/uploads/mechanics',
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

app.get('/:id', mechanic.get);

app.get('/', mechanic.getAll);

app.post('/add', upload.single('profileImage'), mechanic.add);

app.put('/edit/:id', upload.single('profileImage'), mechanic.update);

app.delete('/:id', mechanic.delete);

module.exports = app;
