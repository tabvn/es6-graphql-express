import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType
} from 'graphql';

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
        type: new GraphQLList(UserType),
        args: {
            filter: {
                type: filterType
            }
        },
        resolve: async (root, {filter}, {userLoader}) => {
            return await User.find(filter);
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