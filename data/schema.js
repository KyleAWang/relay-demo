import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    nodeDefinitions,
    fromGlobalId,
    globalIdField
} from 'graphql-relay'

import {
    getOrders,
    getOrder,
    getItems
} from './database'

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Orders') {
            return getOrders()
        } else if (type === 'Order') {
            return getOrder(id);
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Orders) {
            return ordersType;
        } else if (obj instanceof  Order){
            return orderType;
        } else {
            return null;
        }
    }
);

const ordersType = new GraphQLObjectType({
    name: 'Orders',
    description: 'a list of orders ',
    fields: () => ({
        id: globalIdField('Orders'),
        orders: {
            type: orderConnection,
            description: 'orders',
            args: connectionArgs,
            resolve: (orders, args) => connectionFromArray(getOrders(), args),
        },
    }),
    interfaces: [nodeInterface],
});

const orderType = new GraphQLObjectType({
    name: 'Order',
    description: 'an order',
    fields: () => ({
        id: globalIdField('Order'),
        subtotal: {
            type: GraphQLFloat,
            resolve: (order) => order.subtotal,
        },
        items: {
            type: itemConnection,
            description: 'product items',
            args: connectionArgs,
            resolve: (order, args) => connectionFromArray(getItems(order), args),
        },
    }),
    interfaces: [nodeInterface],
});

const itemType = new GraphQLObjectType({
    name: 'Item',
    description: 'order items',
    fields: () => ({
        id: globalIdField('Item'),
        name: {
            type: GraphQLString,
            resolve: (item) => item.name
        },
        price: {
            type: GraphQLFloat,
            resolve: (item) => item.price,
        },
        quantity: {
            type: GraphQLInt,
            resolve: (item) => item.quantity,
        },
        url: {
            type: GraphQLString,
            resolve: (item) => item.url,
        }
    })
});

const {connectionType: orderConnection} =
    connectionDefinitions({name: 'order', nodeType: orderType});

const {connectionType: itemConnection} =
    connectionDefinitions({name: 'item', nodeType: itemType});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        orders: {
            type: ordersType,
            resolve: ()=> getOrders()
        }
    })
});

export const schema = new GraphQLSchema({
    query: queryType
});