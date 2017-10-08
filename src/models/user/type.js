import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';
import {globalIdField} from 'graphql-relay';
import User from './schema';
import {nodeInterface} from "../node/index";

export default new GraphQLObjectType({
    name: 'User',
    description: 'User',
    interfaces: [nodeInterface],

    fields: {
        id: globalIdField(),
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