import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';

import UserType from './type';
import User from './schema';

export default {
    addUser: {
        type: UserType,
        args: {
            name: {
                name: 'name',
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                name: 'email',
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                name: 'password',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, input) => {

            let newUser = new User(input);

            return new Promise((resolve, reject) => {

                User.create(input, (err, user) => {
                    err ? reject(err) : resolve(user);
                })
            });
        }
    }
};