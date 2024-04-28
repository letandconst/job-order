const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginCacheControl } = require('apollo-server-core');

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers');

require('dotenv').config();

// Cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
	cors: true,
	typeDefs,
	resolvers,
	cache: {
		max: 100,
		ttl: 3600,
	},
	plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 60 })],
});

const startServer = async () => {
	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });

	// Connect to Database
	await mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log('Connected to the Database');

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server ready at http://localhost:${port}/graphql`);
	});
};

startServer().catch((err) => {
	console.error('Error starting server:', err.message);
});
