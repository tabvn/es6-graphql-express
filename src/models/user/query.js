import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
    GraphQLInputObjectType
} from 'graphql';

import {
    connectionDefinitions,
    forwardConnectionArgs,
    connectionFromArraySlice,
    cursorToOffset,
} from 'graphql-relay';

import UserType from './type';
import User from './schema';

const filterType = new GraphQLInputObjectType({
    name: 'filterType',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
    }
});

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
    }
});


export default {
    users: {
        type: connectionDefinitions({
            name: 'User',
            nodeType: UserType,
            connectionFields: {
                count: {type: new GraphQLNonNull(GraphQLInt)},
            },
        }).connectionType,
        args: forwardConnectionArgs,
        resolve: async (root, args, {userLoader}) => {
            const limit = typeof args.first === 'undefined' ? '10' : args.first;
            const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
            const filter = args.filter ? args.filter : {};
            const data = await User.find(filter).limit(limit).skip(offset);
            const count = await User.find(filter).count();
            
            return {
                ...connectionFromArraySlice(data, args, {
                    sliceStart: offset,
                    arrayLength: count,
                }),
                count,
            };

        }
    },
    user: {
        type: UserType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: (root, args, {userLoader}) => {
            return userLoader.load(args.id);

        }
    }
};