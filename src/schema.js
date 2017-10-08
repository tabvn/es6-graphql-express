import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId,
} from 'graphql-relay';

import {node, nodes} from './models/node';

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
        node,
        nodes,
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

