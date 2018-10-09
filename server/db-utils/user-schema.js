
const
    mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, select: false }
});

module.exports = mongoose.model('User', userSchema);
