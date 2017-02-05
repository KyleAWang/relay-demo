import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId
} from 'graphql-relay'

import {
    Order,
    Item,
    Orders,
    getOrders,
    getOrder,
    getItems,
    newOrder
} from './database'

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Order') {
            return getOrder()
        } else if (type === 'Orders') {
            return getOrders();
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Order) {
            return orderType;
        } else if (obj instanceof  Orders){
            return ordersType;
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
            resolve: (args) => connectionFromArray(getOrders(), args),
        },
    }),
    // interfaces: [nodeInterface],
});

const orderType = new GraphQLObjectType({
    name: 'Order',
    description: 'an order',
    fields: () => ({
        // id: globalIdField('Order'),
        subtotal: {
            type: GraphQLFloat,
            resolve: (order) => order.subtotal,
        },
        orderId: {
            type: GraphQLString,
            resolve: (order) => order.orderId,
        },
        items: {
            type: new GraphQLList(itemType),
            description: 'product items',
            resolve: (order) => order.items,
        },
    }),
    // interfaces: [nodeInterface],
});

const itemInputType = new GraphQLInputObjectType({
    name: 'ItemInput',
    fields: () => ({
        // id: globalIdField('Item'),
        itemId: {
            type: GraphQLInt,
            resolve: (item) => item.itemId,
        },
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
})

const itemType = new GraphQLObjectType({
    name: 'Item',
    description: 'order items',
    fields: () => ({
        // id: globalIdField('Item'),
        itemId: {
            type: GraphQLInt,
            resolve: (item) => item.itemId,
        },
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

// const {connectionType: itemConnection} =
//     connectionDefinitions({name: 'item', nodeType: itemType});


const OrderMutation = mutationWithClientMutationId({
    name: 'OrderMutation',
    inputFields: {
        orderId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        subtotal: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        items:{
            type: new GraphQLList(itemInputType)
        }
    },
    outputFields: {
        order: {
            type: orderType,
            resolve: ({_order}) => getOrder(_order.orderId)
        },
        orders: {
            type: ordersType,
            resolve: () => getOrders()
        }
    },
    mutateAndGetPayload: ({orderId, subtotal, items}) => {
        const _order = newOrder(orderId, subtotal, items);
        return {_order};
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        orderMutation: OrderMutation
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        orders: {
            type: ordersType,
            resolve: (root)=> getOrders()
        },
        node: nodeField,
    })
});

export const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});