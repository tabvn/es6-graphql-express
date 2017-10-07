import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
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
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
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
    resolve: (root, {filter}) => {
      return new Promise((resolve, reject) => {
         if(!filter){
          filter = {};
         }
          User.find(filter, (err, users) => {
              err ? reject(err): resolve(users);
          });
      })
        

    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
          if(!id){
            return reject(new Error("ID is required."));
          }
          User.findById(id, (err, user) => {
              err ? reject(err): resolve(user);
          });
      })
        

    }
  }
};