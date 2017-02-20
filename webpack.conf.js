import path from 'path';
import webpack from 'webpack';

module.exports = {
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
}