
const
    mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String
    },
    password: String
});

module.exports = mongoose.model('User', userSchema);
