
const
    UserModel = require('../db-utils/user-schema'),
    UserActivityModel = require('../db-utils/user-activity-schema'),
    auth = require('../libs/auth');


module.exports.likeUser = async function (req, res) {
    await toggleLike(req, res, 'LIKE');
};

module.exports.unlikeUser = async function (req, res) {
    await toggleLike(req, res, 'UNLIKE');
};

toggleLike = async function (req, res, param) {
    const token = req.headers['token'];

    await auth.verifyToken(res, token, async function() {
        const affectedUser = req.body.affectedUserId;
        const myId = req.body.id;

        const userActivity = new UserModel({
            affectedUser: affectedUser,
            action: param,
            committedBy: myId
        });

        await UserActivityModel.findOneAndUpdate(
            {
                affectedUser : affectedUser
            },
            userActivity,
            {
                upsert : true,
                new: true,
                runValidators: true
            },
            function (err, doc) { // callback
                if (err) {
                    // handle error
                } else {
                    // handle document
                }
        });
    });
};

module.exports.listUsers = async function (req, res) {
    let usersList = await UserModel.find();
    res.json(usersList);
};

