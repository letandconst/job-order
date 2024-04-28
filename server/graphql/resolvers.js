const { mergeResolvers } = require('@graphql-tools/merge');
const mechanicResolver = require('./resolvers/mechanic.resolver');
const serviceTypeResolver = require('./resolvers/services.resolver');

const resolvers = [mechanicResolver, serviceTypeResolver];

module.exports = mergeResolvers(resolvers);
