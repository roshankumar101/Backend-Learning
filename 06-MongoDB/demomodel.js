const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongopractice`);

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    age: Number
})


module.exports = mongoose.model('user', userSchema);