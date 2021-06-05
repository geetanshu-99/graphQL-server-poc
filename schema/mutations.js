const graphql = require("graphql");
const axios = require("axios");
const keys = require("../configs/keys");
const UserType = require("./types/userType");
const EmployeeType = require("./types/employeeType");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (
        parentValue,
        { firstname, lastname, username, password }
      ) => {
        const response = await axios.post(
          `http://localhost:5000/api/register`,
          {
            firstname,
            lastname,
            username,
            password,
          }
        );
        return response.data;
      },
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parentValue, { username, password }) => {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { username, password }
        );
        return response.data.user;
      },
    },
    addEmployee: {
      type: EmployeeType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        salary: { type: GraphQLInt },
        designation: { type: GraphQLString },
      },
      resolve: async (
        parentValue,
        { firstname, lastname, salary, designation }
      ) => {
        const response = await axios.post("http://localhost:5000/employees", {
          firstname,
          lastname,
          salary,
          designation,
        });
        return response.data;
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parentValue, args) => {
        const response = await axios.delete(`${keys.URI}/employees/${args.id}`);
        return response.data;
      },
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        salary: { type: GraphQLInt },
        designation: { type: GraphQLString },
      },
      resolve: async (parentValue, args) => {
        const response = await axios.put(`${keys.URI}/employees/${args.id}`, {
          firstname: args.firstname,
          lastname: args.lastname,
          salary: args.salary,
          designation: args.designation,
        });
        return response.data;
      },
    },
  },
});

module.exports = mutation;
