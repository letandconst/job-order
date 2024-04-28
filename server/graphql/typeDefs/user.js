const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON

	type User {
		id: ID!
		fullName: String!
		username: String!
		email: String!
		password: String!
		createdAt: String!
		updatedAt: String!
	}

	input UserInput {
		fullName: String!
		username: String!
		email: String!
		password: String!
	}

	type Query {
		getUser(id: ID!): User
		getAllUsers: [User]
	}

	type Mutation {
		createUser(input: UserInput!): Message
		updateUser(id: ID!, input: UserInput!): Message
		deleteUser(id: ID!): Message
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
