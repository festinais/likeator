
const
    mongoose = require('mongoose');


const userActivitySchema = mongoose.Schema({
    affectedUserId: String,
    affectedUserEmail: String,
    affectedUserName: String,
    action: String,
    committedBy: String
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
