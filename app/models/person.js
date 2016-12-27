import Mongoose from 'mongoose';

const Person = new Mongoose.Schema({
    name: String,
    age: Number
});

export default Mongoose.model('Person', Person);