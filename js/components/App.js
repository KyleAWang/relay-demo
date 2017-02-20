import React from 'react';
import Relay from 'react-relay';
import OrderMutation from '../mutation/OrderMutation';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            orderId: '1113',
            subtotal: 10,
            itemId0: '3243',
            itemId1: '3244',
            itemId2: '3245',
            name0: '范文芳',
            name1: '机锋网',
            name2: '放弃而无法',
            price0: 10,
            price1: 20,
            price2: 30,
            quantity0: 1,
            quantity1: 2,
            quantity2: 3,
        }
    }

    renderOrders() {
        let _i = 1;
        return this.props.orders.orders.edges.map(edge => {
            let _j = 0;
            return (
                <div key={edge.node.orderId}>{edge.node.orderId}
                    <div>{edge.node.items.map(item => {
                        return (
                            <div key={_j++}>{item.name}</div>
                        )
                    })}</div>
                </div>
            );
        });
    };

    handleInputOrderIdChange(e) {
        this.setState({
            orderId: e.target.value,
        })
    }

    handleInputSubtotalChange(e) {
        this.setState({
            subtotal: e.target.value,
        })
    }

    handleInputItemId0Change(e) {
        this.setState({
            itemId0: e.target.value,
        })
    }

    handleInputItemId1Change(e) {
        this.setState({
            itemId1: e.target.value,
        })
    }

    handleInputItemId2Change(e) {
        this.setState({
            itemId2: e.target.value,
        })
    }

    handleInputName0Change(e) {
        this.setState({
            name0: e.target.value,
        })
    }

    handleInputName1Change(e) {
        this.setState({
            name1: e.target.value,
        })
    }

    handleInputName2Change(e) {
        this.setState({
            name2: e.target.value,
        })
    }

    handleInputPrice0Change(e) {
        this.setState({
            price0: e.target.value,
        })
    }

    handleInputPrice1Change(e) {
        this.setState({
            price1: e.target.value,
        })
    }

    handleInputPrice2Change(e) {
        this.setState({
            price2: e.target.value,
        })
    }

    handleInputQuantity0Change(e) {
        this.setState({
            quantity0: e.target.value,
        })
    }

    handleInputQuantity1Change(e) {
        this.setState({
            quantity1: e.target.value,
        })
    }

    handleInputQuantity2Change(e) {
        this.setState({
            quantity2: e.target.value,
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        let _order = {};
        _order.orderId = this.state.orderId;
        _order.subtotal = this.state.subtotal;
        let _items = [];
        let _item = {};
        _item.itemId = this.state.itemId0;
        _item.name = this.state.name0;
        _item.price = this.state.price0;
        _item.quantity = this.state.quantity0;
        _items.push(_item);
        let _item1 = {};
        _item1.itemId = this.state.itemId1;
        _item1.name = this.state.name1;
        _item1.price = this.state.price1;
        _item1.quantity = this.state.quantity1;
        _items.push(_item1);
        let _item2 = {};
        _item2.itemId = this.state.itemId2;
        _item2.name = this.state.name2;
        _item2.price = this.state.price2;
        _item2.quantity = this.state.quantity2;
        _items.push(_item2);
        _order.items = _items;

        this.props.relay.commitUpdate(
            new OrderMutation({
                orderId: _order.orderId,
                subtotal: _order.subtotal,
                items: _order.items
            }, {
                onSuccess: response => {
                    console.log(response.order)
                }
            })
        );

    }

    renderOrderForm() {
        return (
            <div>
                <form name="orderForm" id="orderForm" onSubmit={this.handleSubmit.bind(this)}>
                    orderId: <input type="text" name="orderId" value={this.state.orderId}
                                    onChange={this.handleInputOrderIdChange.bind(this)}/><br/>
                    subtotal: <input type="text" name="subtotal" value={this.state.subtotal}
                                     onChange={this.handleInputSubtotalChange.bind(this)}/><br/>
                    items:<br/>
                    itemId: <input type="text" name="itemId" value={this.state.itemId0}
                                   onChange={this.handleInputItemId0Change.bind(this)}/><br/>
                    name: <input type="text" name="name" value={this.state.name0}
                                 onChange={this.handleInputName0Change.bind(this)}/><br/>
                    price: <input type="text" name="price" value={this.state.price0}
                                  onChange={this.handleInputPrice0Change.bind(this)}/><br/>
                    quantity:<input type="text" name="quantity" value={this.state.quantity0}
                                    onChange={this.handleInputQuantity0Change.bind(this)}/><br/>
                    itemId: <input type="text" name="itemId" value={this.state.itemId1}
                                   onChange={this.handleInputItemId1Change.bind(this)}/><br/>
                    name: <input type="text" name="name" value={this.state.name1}
                                 onChange={this.handleInputName1Change.bind(this)}/><br/>
                    price: <input type="text" name="price" value={this.state.price1}
                                  onChange={this.handleInputPrice1Change.bind(this)}/><br/>
                    quantity:<input type="text" name="quantity" value={this.state.quantity1}
                                    onChange={this.handleInputQuantity1Change.bind(this)}/><br/>
                    itemId: <input type="text" name="itemId" value={this.state.itemId2}
                                   onChange={this.handleInputItemId2Change.bind(this)}/><br/>
                    name: <input type="text" name="name" value={this.state.name2}
                                 onChange={this.handleInputName2Change.bind(this)}/><br/>
                    price: <input type="text" name="price" value={this.state.price2}
                                  onChange={this.handleInputPrice2Change.bind(this)}/><br/>
                    quantity:<input type="text" name="quantity" value={this.state.quantity2}
                                    onChange={this.handleInputQuantity2Change.bind(this)}/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    render() {
        let i = 0;
        return (
            <div>
                <h1>Hello World</h1>
                {this.props.viewer}
                <div>
                </div>
            </div>
        );
    }

}

export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
        fragment on Viewer{
                 _id
                 subtotal
                  orderId
                  items{
                    quantity
                    name
                    price
                  }
                  address{
                    name
                    tel
                    weight
                  }
                  shipping{
                    _id
                    no
                    url
                    status
                  }
            
        }
        `,
    },
});