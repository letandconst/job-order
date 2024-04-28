const Mechanic = require('../models/mechanic.model');
const Job = require('../models/job.model');
const cloudinary = require('cloudinary').v2;

const addMechanic = async (data) => {
	try {
		let { firstName, lastName, address, profileImage, mobileNumber } = data;

		if (profileImage) {
			// TODO
			// Apply profile image upload via cloudinary
		} else {
			profileImage = 'https://asset.cloudinary.com/dle7cxxwp/64f97c9a0891f191e62c4a3976224e4a';
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
		return mechanic;
	} catch (error) {
		throw new Error(`Failed to create new mechanic: ${error.message}`);
	}
};

const updateMechanic = async (id, data) => {
	try {
		const existingMechanic = await Mechanic.findById(id);
		if (!existingMechanic) {
			throw new Error('Mechanic not found');
		}

		if (data.address) {
			existingMechanic.address = data.address;
		}

		if (data.mobileNumber) {
			existingMechanic.mobileNumber = data.mobileNumber;
		}

		if (data.profileImage) {
			existingMechanic.profileImage = data.profileImage;
			// TODO
		}

		existingMechanic.updatedAt = new Date();

		await existingMechanic.save();

		return existingMechanic;
	} catch (error) {
		throw new Error(`Failed to update mechanic: ${error.message}`);
	}
};

const deleteMechanic = async (id) => {
	try {
		const mechanic = await Mechanic.findById(id);
		if (!mechanic || mechanic.deleted) {
			throw new Error('Mechanic not found');
		}

		mechanic.deleted = true;
		await mechanic.save();
	} catch (error) {
		throw new Error(`Failed to delete this mechanic: ${error.message}`);
	}
};

const getMechanic = async (id) => {
	try {
		const mechanic = await Mechanic.findById(id);

		if (!mechanic || mechanic.deleted) {
			throw new Error('Mechanic not found');
		}

		return mechanic;
	} catch (error) {
		throw new Error(`Failed to fetch this mechanic: ${error.message}`);
	}
};

const getAllMechanics = async () => {
	try {
		const mechanics = await Mechanic.find({ deleted: { $ne: true } });
		return mechanics;
	} catch (error) {
		throw new Error(`Failed to fetch all mechanics: ${error.message}`);
	}
};

module.exports = {
	addMechanic,
	updateMechanic,
	deleteMechanic,
	getMechanic,
	getAllMechanics,
};
