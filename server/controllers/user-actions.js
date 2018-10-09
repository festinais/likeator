
const
    UserModel = require('../db-utils/user-schema'),
    ActivityModel = require('../db-utils/user-activity-schema');

const toggleLikeAction = async function (committedBy, affectedUserId, body) {

    return await ActivityModel.updateOne(
        {
            committedBy : committedBy,
            affectedUserId : affectedUserId
        },
        {
            $set: body
        },
        {
            upsert : true
        });
};

module.exports.mostLiked = async function (req, res) {
    let result = await ActivityModel.aggregate([
        {
            $match: {
                action: 'like'

            }
        },
        {

            $group: {
                _id: {
                    email: "$affectedUserEmail",
                    name: "$affectedUserName"
                },
                count: {$sum: 1}
            },
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $project: {
                _id: 0,
                email: "$_id.email",
                name: "$_id.name",
                count: "$count"
            }
        }
    ]);

    res.json(result)
};


module.exports.likeActionHandler = async function (req, res) {
    /*
    * This route handler is used for like/unlike endpoint
    * */
    let {id} = req.params;

    let affectedUser = await UserModel.findOne({_id: id});

    let action = req.path.split("/");
    let body = {
        affectedUserEmail: affectedUser.email,
        affectedUserName: affectedUser.name,
        action: action[action.length - 1],
        committedBy: req.body.committedBy
    };

    let result = await toggleLikeAction(req.body.committedBy, id, body);
    res.send(result)
};

module.exports.getUser = async function(req, res) {
    let {id} = req.params;
    let foundUser = await UserModel.findOne({affectedUserId: id});

    let count = await ActivityModel.find({
        affectedUserEmail : foundUser.email
    }).count();

    res.status(200).json({
        email : foundUser.email,
        username : foundUser.name,
        numberOfLikes: count
    })
};


module.exports.listUsers = async function (req, res) {
    let usersList = await UserModel.find();
    res.json(usersList);
};

