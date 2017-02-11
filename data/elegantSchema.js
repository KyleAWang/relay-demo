import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';

import {
    OrderQueries
} from './order/OrderQL';


let viewerType = new GraphQLObjectType({
    name: 'viewer',
    fields: () => ({
        orders: OrderQueries.orders,
    })
});

let RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        viewer: {
            type: viewerType
        }
    })
});

let schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;