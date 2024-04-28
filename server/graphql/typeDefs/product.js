const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON

	type Product {
		id: ID!
		name: String!
		description: String!
		price: Float!
		stockQuantity: Int!
		productImage: String
		createdAt: String!
		updatedAt: String!
	}

	input ProductInput {
		name: String!
		description: String!
		price: Float!
		stockQuantity: Int!
		productImage: String
	}

	type Query {
		getProduct(id: ID!): Product
		getAllProducts: [Product]
	}

	type Mutation {
		createProduct(input: ProductInput!): Message
		updateProduct(id: ID!, input: ProductInput!): Message
		deleteProduct(id: ID!): Message
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
