const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON

	type Service {
		id: ID!
		name: String!
		description: String!
		amount: Float!
		createdAt: String!
		updatedAt: String!
	}

	input ServiceInput {
		name: String
		description: String
		amount: Float
	}

	type Query {
		services: [Service]
	}

	type Mutation {
		addServiceType(input: ServiceInput!): Message
		updateServiceType(id: ID!, input: ServiceInput!): Message
		deleteServiceType(id: ID!): Message
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
