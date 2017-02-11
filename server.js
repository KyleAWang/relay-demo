import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// import {schema} from './data/schema';
import schema from './data/elegantSchema';
import mongoose from './config/mongoose'

const APP_PORT = 3002;
const GRAPHQL_PORT = 8080;


mongoose.connect(function (db) {
    console.log('connect');
});

const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, pretty: true,graphiql: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/,
            }
        ]
    },
    output: {filename: 'app.js', path: '/'}
});
const app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: '/js/',
    stats: {colors: true}
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});