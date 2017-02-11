
import mongoose from 'mongoose';
import chalk from 'chalk';
import path from 'path';

const dburi = 'mongodb://localhost/papp-dev';

module.exports.connect = function (cb) {
    const db = mongoose.connect(dburi, {}, function (err) {
        if (err){
            console.error(chalk.red('Could not connect to MongoDB'));
            console.log(err);
        }else {
            mongoose.set('debug', true);

            if(cb) cb(db);
        }
    })
};

module.exports.disconnect = function (cb) {
    mongoose.disconnect(function (err) {
        console.info(chalk.yellow('Disconnected from MongoDB'));
        cb(err);
    })
};

module.exports.loadModels = function (cb) {
    require('./order.server.model.js');
    require('./user.server.model.js');
    if (cb) cb();
};