
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import createBrowserHistory from 'history/createBrowserHistory'
// import AppHomeRoute from './routes/AppHomeRoute'
import ViewerQueries from './queries/ViewerQueries';
import routes from './routes/routes';

ReactDOM.render(
    <Relay.RootContainer
        Component={App}
        route={new ViewerQueries()}
    />,
    document.getElementById('root')
);

let history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>{routes}</Router>,
    document.getElementById('app')
);