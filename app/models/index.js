import Mongoose from 'mongoose';

const db = Mongoose.connect('mongodb://localhost/koa').connection;

export default db;