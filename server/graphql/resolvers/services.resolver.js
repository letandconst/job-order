const { addServiceType, updateServiceType, deleteServiceType, getAllServices } = require('../../controllers/service-type.controller');

module.exports = {
	Query: {
		services: async () => {
			try {
				let services = await getAllServices();

				if (!services) {
					throw new Error('Error in fetching services');
				}

				return services;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		addServiceType: async (_, { input }) => {
			try {
				let newServiceType = await addServiceType(input);

				return {
					data: newServiceType,
					success: true,
					message: 'New service type has been added successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to add a new service.',
					error: {
						message: error.message,
						code: 'ADD_SERVICE_TYPE_ERROR',
					},
				};
			}
		},
		updateServiceType: async (_, { id, input }) => {
			try {
				let updatedService = await updateServiceType(id, input);

				return {
					data: updatedService,
					success: true,
					message: 'Service type updated successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to update service type.',
					error: {
						message: error.message,
						code: 'UPDATE_SERVICE_TYPE_ERROR',
					},
				};
			}
		},
		deleteServiceType: async (_, { id }) => {
			try {
				await deleteServiceType(id);

				return {
					data: null,
					success: true,
					message: 'Service type is deleted successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to delete service type.',
					error: {
						message: error.message,
						code: 'DELETE_SERVICE_TYPE_ERROR',
					},
				};
			}
		},
	},
};
