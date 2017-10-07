import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';


import mongoose from 'mongoose';
import User from './models/user/schema';

import {
  UserQueries,
  UserMutations,
  UserType
  } from './models/user';



let RootQuery = new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: UserQueries.user,
            users: UserQueries.users,
        }
});



let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: UserMutations.addUser,
  })
});


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

