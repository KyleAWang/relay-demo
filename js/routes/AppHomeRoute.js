import Relay from 'react-relay';

export default class extends Relay.Route{
    static queries = {
        orders: () => Relay.QL`query { orders }`
    };
    static routeName = 'AppHomeRoute';
}