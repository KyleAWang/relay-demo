import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLInputObjectType
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Item',
    description: 'An item',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        url: {
            type: GraphQLString,
        },
        price: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        quantity: {
            type: GraphQLInt
        },
        subtotal: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    })
})