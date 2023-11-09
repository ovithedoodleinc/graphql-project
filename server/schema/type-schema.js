const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  // GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = graphql;

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "This is person",
  fields: () => ({
    // id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: GraphQLBoolean },
    cgpa: { type: GraphQLFloat },
    justAType: {
      type: PersonType,
      resolve(parent, args) {
        return parent;
      },
    },
    nameWithAge: {
      type: GraphQLString,
      resolve(parent, args) {
        return `name: ${parent.name} age:${parent.age}`;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "this is root query",
  fields: {
    person: {
      type: PersonType,
      // args: { id: {type: graphql.GraphQLID }},
      resolve(parent, args) {
        const person = {
          name: "showvike",
          age: 26,
          isMarried: false,
          cgpa: 2.88,
        };

        return person;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
