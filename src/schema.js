import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {node, nodes} from './models/node';

import {
    UserQueries,
    UserMutations,
    UserType
} from './models/user';

import {createUser} from './models/user/mutation'

let RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: UserQueries.user,
        users: UserQueries.users,
        node,
        nodes,
    }
});


let RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser
    }
});


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

