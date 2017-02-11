import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLFloat,
    GraphQL
} from 'graphql';

import ItemTypeQL from './ItemTypeQL';
import AddressTypeQL from './AddressTypeQL';
import ShippingTypeQL from './ShippingTypeQL';

import CustomGraphQLDateType from 'graphql-custom-datetype';

export default new GraphQLObjectType({
    name: 'Order',
    description: 'An order',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        totalCost: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        totalRmbCost: {
            type: GraphQLFloat
        },
        orderId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        subtotal: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        updated: {
            type: new GraphQLNonNull(CustomGraphQLDateType)
        },
        created: {
            type: new GraphQLNonNull(CustomGraphQLDateType)
        },
        status: {
            type: GraphQLString
        },
        items: {
            type: new GraphQLList(ItemTypeQL),
        },
        address:{
            type: AddressTypeQL,
        },
        shipping: {
            type: new GraphQLList(ShippingTypeQL),
        }
    })
});