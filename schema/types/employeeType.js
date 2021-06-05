const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: {
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    salary: { type: GraphQLInt },
    designation: { type: GraphQLString },
  },
});
module.exports = EmployeeType;
