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


let RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        orders: OrderQueries.orders
    })
});

let schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;