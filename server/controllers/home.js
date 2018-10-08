
const
    UserModel = require('../db-utils/user-schema');


module.exports = async function (req, res) {
    let userInfo = await UserModel.findOne();
    console.log(userInfo)
    res.render(__dirname + '/../views/index.html', {name: "Endrit"});
};

