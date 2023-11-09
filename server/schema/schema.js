const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

// dummy data
const usersData = [
  { id: "123", name: "fahim", age: 24, profession: "web developer" },
  { id: "124", name: "nuren", age: 27, profession: "system developer" },
  { id: "143", name: "ovi", age: 26, profession: "software engineer" },
];

const hobbiesData = [
  {
    id: "1",
    title: "programming",
    description: "this is programming",
    userId: "143",
  },
  {
    id: "2",
    title: "swimming",
    description: "this is swimming",
    userId: "123",
  },
  { id: "3", title: "fishing", description: "this is fishing", userId: "143" },
];

const postsData = [
  { id: "1", comment: "hello, world!", userId: "123" },
  { id: "2", comment: "hello, javascript!", userId: "143" },
  { id: "3", comment: "hello, graphql!", userId: "143" },
];

const emailsData = [
  { id: "1", email: "fahim@web.com", userId: "123" },
  { id: "2", email: "nuren@system.com", userId: "124" },
  { id: "3", email: "ovi@software.com", userId: "143" },
  { id: "4", email: "showvike@software.com", userId: "143" },
];

// create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
    emails: {
      type: new GraphQLList(EmailType),
      resolve(parent, args) {
        return _.filter(emailsData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Documentation for hobby...",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Documentation for post...",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const EmailType = new GraphQLObjectType({
  name: "Email",
  description: "Documentation for email...",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return usersData;
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbiesData;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postsData;
      },
    },
    email: {
      type: EmailType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(emailsData, { id: args.id });
      },
    },
    emails: {
      type: new GraphQLList(EmailType),
      resolve(parent, args) {
        return emailsData;
      },
    },
  },
});

// mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Documentation for mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };

        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: { type: GraphQLID },
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const post = {
          comment: args.comment,
          userId: args.userId,
        };

        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        // id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId,
        };

        return hobby;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
