
const
    mongoose = require('mongoose');


const userActivitySchema = mongoose.Schema({
    affectedUser: String,
    action: String,
    committedBy: String
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
