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



export default new GraphQLObjectType({
    name: 'Shipping',
    fields: () => ({
        _id:{
            type: new GraphQLNonNull(GraphQLID)
        },
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