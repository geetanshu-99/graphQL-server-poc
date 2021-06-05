const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;
const keys = require("../../configs/keys");
const EmployeeType = require("./employeeType");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: async (parentValue, args) => {
        const response = await axios.get(`${keys.URI}/employees`);
        return response.data;
      },
    },
    employee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parentValue, args) => {
        const response = await axios.get(`${keys.URI}/employees/${args.id}`);
        return response.data;
      },
    },
  },
});

module.exports = RootQuery;
