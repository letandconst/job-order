const { mergeTypeDefs } = require('@graphql-tools/merge');
const jobType = require('./typeDefs/job');
const mechanicType = require('./typeDefs/mechanic');
const productType = require('./typeDefs/product');
const serviceType = require('./typeDefs/serviceType');
const userType = require('./typeDefs/user');

const types = [mechanicType, serviceType];

module.exports = mergeTypeDefs(types);
