
module.exports.home = async function (req, res) {
    res.render(__dirname + '/../views/index.html');
};

module.exports.profile = async function (req, res) {
    res.render(__dirname + '/../views/profile.html');
};

module.exports.users = async function (req, res) {
    res.render(__dirname + '/../views/users.html');
};

// module.exports.mostLiked = async function (req, res) {
//     res.render(__dirname + '/../views/.html');
// };


