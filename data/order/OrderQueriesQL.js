import {
    GraphQLList
} from 'graphql'

import OrderType from './typeQL/OrderTypeQL';
import OrderDB from './OrderDB';

export default {
    orders: {
        type: new GraphQLList(OrderType),
        resolve: OrderDB.getOrders,
    }
}