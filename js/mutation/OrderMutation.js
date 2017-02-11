import Relay from 'react-relay';
import RelayMutationType from 'react-relay';


export default class OrderMutation extends Relay.Mutation {

    getCollisionKey() {
        return `order_11`
    }

    getMutation() {
        return Relay.QL`mutation { orderMutation }`;
    }

    getVariables() {
        return {
            orderId: this.props.orderId,
            subtotal: this.props.subtotal,
            items: this.props.items,
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on OrderMutationPayload{
                order {
                    orderId,
                    subtotal,
                }
            }
        `
    }

    getConfigs(){
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [
                Relay.QL`
                fragment on OrderMutationPayload{
                    order {
                        orderId,
                        subtotal,
                    } 
                }
                `
            ]
        }]
    }
}