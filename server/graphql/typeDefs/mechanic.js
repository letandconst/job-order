module.exports = /* GraphQL */ `
	scalar JSON

	type Mechanic {
		_id: String!
		firstName: String!
		lastName: String!
		address: String!
		mobileNumber: String!
		totalJobs: Int!
		profileImage: String
		createdAt: String!
		updatedAt: String!
		deleted: Boolean!
	}

	input MechanicInput {
		firstName: String
		lastName: String
		address: String
		mobileNumber: String
		profileImage: String
	}

	type Query {
		mechanic(id: ID!): Mechanic!
		mechanics: [Mechanic]
	}

	type Mutation {
		createMechanic(input: MechanicInput!): Message
		updateMechanic(id: ID!, input: MechanicInput!): Message
		deleteMechanic(id: ID!): Message
	}

	type Message {
		data: JSON
		success: Boolean
		message: String
		error: Error
	}

	type Error {
		message: String!
		code: String
	}
`;
