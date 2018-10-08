
const
    UserModel = require('../db-utils/user-schema');


module.exports = async function (req, res) {
    res.render(__dirname + '/../views/index.html');
};

