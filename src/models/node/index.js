import {nodeDefinitions, fromGlobalId} from 'graphql-relay';

const {nodeInterface, nodeField: node, nodesField: nodes} = nodeDefinitions(
    (globalId, context) => {
        const {type, id} = fromGlobalId(globalId);

        //console.log("f", type, id);

        if (type === 'User') return context.userLoader.load(id);

        return null;
    },
    obj => {
        if (obj.__type === 'User') return require('../user/type').default;

        return null;
    },
);

export {nodeInterface, node, nodes};