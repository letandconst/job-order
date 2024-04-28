const { addMechanic, updateMechanic, deleteMechanic, getMechanic, getAllMechanics } = require('../../controllers/mechanic.controller');

module.exports = {
	Query: {
		mechanic: async (_, { id }) => {
			try {
				let mechanic = await getMechanic(id);

				if (!mechanic) {
					throw new Error('Mechanic not found');
				}

				return mechanic;
			} catch (error) {
				throw error;
			}
		},
		mechanics: async () => {
			try {
				let mechanics = await getAllMechanics();

				if (!mechanics) {
					throw new Error('Error in fetching mechanics');
				}

				return mechanics;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		createMechanic: async (_, { input }) => {
			try {
				let newMechanic = await addMechanic(input);

				return {
					data: newMechanic,
					success: true,
					message: 'New mechanic has been added successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to add a new mechanic.',
					error: {
						message: error.message,
						code: 'ADD_MECHANIC_ERROR',
					},
				};
			}
		},
		updateMechanic: async (_, { id, input }) => {
			try {
				let newMechanic = await updateMechanic(id, input);

				return {
					data: newMechanic,
					success: true,
					message: 'Mechanic is updated successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to update mechanic.',
					error: {
						message: error.message,
						code: 'UPDATE_MECHANIC_ERROR',
					},
				};
			}
		},
		deleteMechanic: async (_, { id }) => {
			try {
				await deleteMechanic(id);

				return {
					data: null,
					success: true,
					message: 'Mechanic deleted successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to delete mechanic.',
					error: {
						message: error.message,
						code: 'DELETE_MECHANIC_ERROR',
					},
				};
			}
		},
	},
};
