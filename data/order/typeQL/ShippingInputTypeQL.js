import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLFloat,
    GraphQL,
    GraphQLInputObjectType
} from 'graphql';



export default new GraphQLInputObjectType({
    name: 'ShippingInput',
    fields: () => ({
        no: {
            type: new GraphQLNonNull(GraphQLString)
        },
        url: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
    })
});