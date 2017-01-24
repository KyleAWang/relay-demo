import React from 'react';
import Relay from 'react-relay';

class App extends React.Component{

    renderOrders(){
        return this.props.orders.orders.edges.map(edge=>{
            return(
                <div key={edge.node.id}>{edge.node.subtotal}</div>
            )
        });
    };

    render(){
        return(
            <div>
                <h1>Hello World</h1>
                {this.renderOrders()}
            </div>
        );
    }

}

export default Relay.createContainer(App, {
    fragments: {
        orders: () => Relay.QL`
        fragment on Orders{
            id,
            orders{
                edges{
                    node {
                        id,
                        subtotal,
                        items{
                            edges{
                                node{
                                    name,
                                    price,
                                    quantity,
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
    },
});