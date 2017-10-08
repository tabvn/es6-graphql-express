import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import User from './schema';

export default new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    },
});