const
    jwt = require('jsonwebtoken'),
    config = require('../../config');

module.exports.createToken = async function(userId) {

    // create a token that expires in 24 hours
    const token = await jwt.sign({ id: userId }, config.JWT_SECRET, {
        expiresIn: 86400
    });
    return token;
};

module.exports.verifyToken = async function(res, token, callback) {
    if (!token)
        return res.status(401).json(
            {
                auth: false,
                message: 'No token provided.'
            });

    jwt.verify(token, config.JWT_SECRET, function(err) {
        if (err)
            return res.status(500).json(
                {
                    auth: false,
                    message: 'Failed to authenticate token.'
                });

        callback();
    });
};