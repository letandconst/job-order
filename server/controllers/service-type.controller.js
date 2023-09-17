const ServiceType = require('../models/service-type.model');

exports.addServiceType = async (req, res) => {
	try {
		const { name, description, amount } = req.body;

		if (!name || !description || !amount) {
			return res.status(400).json({ message: 'All fields are required ⚠' });
		}

		const newServiceType = new ServiceType({
			name,
			description,
			amount: parseFloat(amount),
		});

		await newServiceType.save();
		res.json({
			message: 'Service Type successfully Added ✔',
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateServiceType = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, amount, ...updateData } = req.body;

		updateData.updatedAt = new Date();

		await ServiceType.findByIdAndUpdate(id, updateData);

		res.json({ message: 'Service Type updated successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error updating Service Type' });
	}
};

exports.getAllServices = async (req, res) => {
	try {
		const services = await ServiceType.find();
		res.json(services);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching services' });
	}
};

exports.deleteServiceType = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedServiceType = await ServiceType.findByIdAndDelete(id);
		if (!deletedServiceType) {
			return res.status(404).json({ message: 'Service Type not found' });
		}
		res.json({ message: 'Service Type deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting Service Type' });
	}
};
