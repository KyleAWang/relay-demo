import React from 'react';
import {Route} from 'react-router';
import FluxApp from '../components/FluxApp';
import Orders from '../components/Orders';
import OrderDetails from '../components/OrderDetails';
import Users from '../components/Users';


export default (
    <Route component={FluxApp}>
        <Route path='/' component={Home}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/orderdetail' component={OrderDetails}/>
        <Route path='/users' component={Users}/>
    </Route>
);