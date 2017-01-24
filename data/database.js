export class Order{
    constructor(orderId, items, subtotal){
        this._orderId = orderId;
        this._items = items;
        this._subtotal = subtotal;
    }
    set orderId (orderId) {this._orderId = orderId}
    get orderId () {return this._orderId}
    set items (items) {this._items = items}
    get items () {return this._items}
    set subtotal (subtotal) {this._subtotal = subtotal}
    get subtotal () {return this._subtotal}

}

export class Item{
    constructor(name, price, quantity, url){

        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._url = url;
    }
    set name (name) {this._name = name}
    get name () {return this._name}
    set price (price) {this._price = price}
    get price () {return this._price}
    set quantity (quantity) {this._quantity = quantity}
    get quantity () {return this._quantity}
    set url (url) {this._url = url}
    get url () {return this._url}
}

const orders = [];
(function () {
    let items=[], items1=[], items2=[];
    items.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html'));
    items.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html'));
    orders.push(new Order('20160701156133', items, 205.8));

    items1.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html'));
    items1.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html'));
    orders.push(new Order('20160701156134', items, 205.8));

    items2.push(new Item('Swisse 血橙美肤饮料 500ml 促进生成胶原蛋白', 22, 1, 'http://www.wellcome.co.nz/product-708.html'));
    items2.push(new Item('Ecostore 纯天然温和羊奶皂 80克', 2.45, 1, 'http://www.wellcome.co.nz/product-1094.html'));
    orders.push(new Order('20160701156135', items2, 205.8));
})();

export function getOrders() {
    return orders;
}

export function getOrder(id) {
    return orders.find(o => o.id === id);
}

export function getItems(order) {
    return orders.find(o => o.id === order.id).items;
}
