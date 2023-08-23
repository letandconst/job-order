const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

// Routes
const routes = require('../routes');

// Access API
app.get('/', (req, res) => {
	res.json({ message: 'Job Order API v1' });
});

app.use('/', routes);

// Connect to Database
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Cloudinary config

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Check connection state

const db = mongoose.connection;
db.on('error', (err) => {
	console.error('MongoDB connection error:', err);
});

db.once('open', () => {
	console.log('Connected to the Database');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('Listening on port', port);
});
