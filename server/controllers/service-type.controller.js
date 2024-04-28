const ServiceType = require('../models/service-type.model');

exports.addServiceType = async (input) => {
	try {
		const { name, description, amount } = input;

		const newServiceType = new ServiceType({
			name,
			description,
			amount: parseFloat(amount),
		});

		await newServiceType.save();
		return newServiceType;
	} catch (error) {
		throw new Error(`Failed to add new service: ${error.message}`);
	}
};

exports.updateServiceType = async (id, data) => {
	try {
		const existingService = await ServiceType.findById(id);
		if (!existingService) {
			throw new Error('Service not found');
		}

		if (data.description) {
			existingService.description = data.description;
		}

		if (data.amount) {
			existingService.amount = data.amount;
		}

		existingService.updatedAt = new Date();

		await existingService.save();

		return existingService;
	} catch (error) {
		throw new Error(`Failed to update this service: ${error.message}`);
	}
};

exports.getAllServices = async () => {
	try {
		const services = await ServiceType.find();
		return services;
	} catch (error) {
		throw new Error(`Failed to fetch services: ${error.message}`);
	}
};

exports.deleteServiceType = async (id) => {
	try {
		const deletedServiceType = await ServiceType.findByIdAndDelete(id);
		if (!deletedServiceType) {
			throw new Error('Service not found');
		}
	} catch (error) {
		throw new Error(`Failed to delete this service: ${error.message}`);
	}
};
