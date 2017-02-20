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
    OrderQueries,
    OrderMutations
} from './order/OrderQL';


// const RootQuery = new GraphQLObjectType({
//     name: 'Query',
//     fields: () => ({
//         orders: OrderQueries.orders
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: OrderQueries.viewer,
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addOrder: OrderMutations.addOrder
    })
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default schema;