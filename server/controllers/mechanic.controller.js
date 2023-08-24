const Mechanic = require('../models/mechanic.model');
const cloudinary = require('cloudinary').v2;

exports.add = async (req, res) => {
	try {
		const { firstName, lastName, address, mobileNumber } = req.body;
		let profileImage;

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, { folder: 'images/mechanics' });
			profileImage = result.secure_url;
		} else {
			profileImage = 'https://w7.pngwing.com/pngs/389/25/png-transparent-emoji-hug-emoticon-emoji-face-smile-emoji-love-smiley-sticker-thumbnail.png';
		}

		if (!firstName || !lastName || !address || !mobileNumber) {
			return res.status(400).json({ error: 'All fields are required ⚠' });
		}

		const mechanic = new Mechanic({
			firstName,
			lastName,
			address,
			mobileNumber,
			profileImage,
			createdAt: new Date().toISOString(),
		});

		await mechanic.save();
		res.json({
			message: 'Mechanic successfully Added ✔',
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const { firstName, lastName, address, mobileNumber } = req.body;
		const updatedData = {};

		if (firstName) updatedData.firstName = firstName;
		if (lastName) updatedData.lastName = lastName;
		if (address) updatedData.address = address;
		if (mobileNumber) updatedData.mobileNumber = mobileNumber;

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, { folder: 'mechanics/image' });
			updatedData.profileImage = result.secure_url;
		}

		const updatedMechanic = await Mechanic.findByIdAndUpdate(req.params.id, updatedData, { new: true });

		if (!updatedMechanic) {
			return res.status(404).json({ error: 'Mechanic not found' });
		}

		res.status(200).json(updatedMechanic);
	} catch (error) {
		res.status(500).json({ error: 'Could not update mechanic' });
	}
};

exports.delete = async (req, res) => {
	try {
		await Mechanic.findByIdAndDelete(req.params.id);
		res.json({ message: 'Mechanic has been deleted successfully!' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.get = async (req, res) => {
	try {
		const mechanic = await Mechanic.findById(req.params.id);

		if (!mechanic) {
			return res.status(404).json({ error: 'Mechanic not found' });
		}

		res.status(200).json(mechanic);
	} catch (error) {
		res.status(500).json({ error: 'Could not get mechanic' });
	}
};

exports.getAll = async (req, res) => {
	try {
		const mechanics = await Mechanic.find();
		res.status(200).json(mechanics);
	} catch (error) {
		res.status(500).json({ error: 'Could not get mechanics' });
	}
};
