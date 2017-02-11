import mongoose from 'mongoose';
import chalk from 'chalk';
import mongooseaa from '../config/mongoose';
import Q from 'q';

mongoose.Promise = Q.Promise;
mongooseaa.loadModels();

const OrderDB = mongoose.model('Order');


export class Order {}

export class Item {}
// let orders = new Orders();
const order = new Order();

//
// order.id = '20160701156133';
// order.subtotal = 305.8;
//
// const items = [];
const orders = [];
//
// (function () {
//     let items = [], items1 = [], items2 = [];
//     items.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html', 11));
//     items.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html', 12));
//     items.push(new Item('Ecostore 纯天然温和羊奶皂 90克', 3.45, 1, 'http://www.wellcome.co.nz/product-1094.html', 13));
//     orders.push(new Order('20160701156133', items, 105.8));
//
//     items1.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html'));
//     items1.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html'));
//     orders.push(new Order('20160701156134', items1, 205.8));
//
//     items2.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html'));
//     items2.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html'));
//     orders.push(new Order('20160701156135', items2, 305.8));
//
// })();

export function getOrders() {
    // return new Promise((resolve, reject) => {
    //     OrderDB.find().limit(10).select('orderId  subtotal').exec((err, res) => {
    //         console.log('get order l');
    //         err? reject(err) : resolve(res);
    //     });
    // });


    // let _orders = [];
    let promise = OrderDB.find().select('orderId items.name items.price items.quantity  subtotal').exec();
    promise.then(function (orders) {
        console.log(orders[0].items);
    });


    return promise;
    // promise.then(function (_orders) {
    //     console.log('getOrders:');
    //     console.log(_orders.length);
    //     // console.log(_orders[0]);
    //     return _orders;
    // }).catch(function (err) {
    //     console.log('error: ', err);
    // });
}

export function getOrder(orderId) {
    console.log('db.getorder_id', orderId);
    console.log(orders.find(order => order.orderId === orderId));
    return orders.find(order => order.orderId === orderId);
}

export function getItems() {
    console.log('items:', items);
    return items;
}

export function newOrder(orderId, subTotal, items) {
    console.log('orderId:', orderId, '  subtotal:', subTotal);
    let _order = new Order();
    _order.orderId = orderId;
    _order.subtotal = subTotal;
    _order.items = items;
    orders.push(_order);
    return _order;
}
