import mongoose from 'mongoose';
import chalk from 'chalk';
import mongooseaa from '../../config/mongoose';
import Q from 'q';

mongoose.Promise = Q.Promise;
mongooseaa.loadModels();

const OrderDB = mongoose.model('Order');



module.exports.getOrders = () => {
    let promise = OrderDB.find().select().exec();
    return promise;
};