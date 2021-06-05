const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = new GraphQLObjectType({
  name: "Users",
  fields: {
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

module.exports = UserType;
