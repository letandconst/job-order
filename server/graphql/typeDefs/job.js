const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON

	type Product {
		id: ID!
		product: Product!
		quantity: Int!
	}

	input ProductInput {
		product: ID!
		quantity: Int!
	}

	type Job {
		id: ID!
		customerName: String!
		address: String!
		carModel: String!
		plateNumber: String!
		mobileNumber: String!
		assignedMechanic: Mechanic!
		products: [Product!]!
		workRequested: [WorkRequest!]!
		totalLabor: Float!
		totalProductPrice: Float!
		totalPrice: Float!
		status: String!
		createdAt: String!
		updatedAt: String!
	}

	input JobInput {
		customerName: String!
		address: String!
		carModel: String!
		plateNumber: String!
		mobileNumber: String!
		assignedMechanic: ID!
		products: [ProductInput!]!
		workRequested: [WorkRequestInput!]!
		totalLabor: Float
		totalProductPrice: Float
		totalPrice: Float
		status: String
	}

	input WorkRequestInput {
		request: String!
		labor: Float
	}

	type WorkRequest {
		request: String!
		labor: Float
	}

	type Query {
		getJob(id: ID!): Job
		getAllJobs: [Job]
	}

	type Mutation {
		createJob(input: JobInput!): Message
		updateJob(id: ID!, input: JobInput!): Message
		deleteJob(id: ID!): Message
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
