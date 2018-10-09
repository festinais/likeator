
const
    UserModel = require('../db-utils/user-schema'),
    ActivityModel = require('../db-utils/user-activity-schema');


module.exports.myProfile = async function(req, res) {

    let user = await UserModel.findOne({
        email : req.body.email
    });

    let count = await ActivityModel.find({
        affectedUserEmail : req.body.email
    }).count();

    res.status(200).json({
        email : req.body.email,
        name : user.name,
        numberOfLikes: count
    })
};

module.exports.usersList = async function(req, res) {

    let users = await UserModel.find();
    let userEmail = req.query.email;

    let activityData =  (await ActivityModel.find({
            committedBy : userEmail,
            action: 'like'
        },
        {
            _id: 0,
            affectedUserEmail: 1
        })).map(itm => itm.affectedUserEmail);


    let resp = []
    users.forEach(function (itm) {

        if(activityData.indexOf(itm._doc.email) > -1){
            itm._doc['action'] = 'like'

        }else {
            itm._doc['action'] = 'unlike'
        }
        resp.push(itm._doc)
    });

    res.status(200).json({
        data: resp
    })
};