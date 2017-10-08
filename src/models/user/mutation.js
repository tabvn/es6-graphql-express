import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';

import {mutationWithClientMutationId} from 'graphql-relay';

import UserType from './type';
import User from './schema';


const inputFields = {
    name: {
        type: new GraphQLNonNull(GraphQLString),
    },
    email: {
        type: new GraphQLNonNull(GraphQLString)
    },
    password: {
        type: new GraphQLNonNull(GraphQLString)
    }
};

const outputFields = {
    user: {
        type: UserType
    }
}

export const createUser = mutationWithClientMutationId({
    name: 'createUser',
    inputFields,
    outputFields,
    async mutateAndGetPayload(input, context) {
        let createdUser = await User.create(input);
        return {user: await context.userLoader.load(createdUser._id)};
    },
});