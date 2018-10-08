
const
    UserModel = require('../db-utils/user-schema'),
    auth = require('../libs/auth');


module.exports.myProfile = async function(req, res) {
    const email = {
        email : req.body.email
    };
    await UserModel.findOne(email, async function(err, user) {
        if(err)
            return res.status(500).json({
                message : err
            });

        if (user === null) {
            res.status(400).json({
                message : "User not found!",
                auth : true
            });

        } else {
            res.status(400).json({
                message : "User is found!",
                data : user
            });
        }
    });
};