'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var schema = exports.schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: _graphql.GraphQLString,
                resolve: function resolve() {
                    return 'world';
                }
            }
        }
    })
});
//# sourceMappingURL=schema.js.map