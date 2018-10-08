const
    express = require('express'),
    router = express.Router(),
    auth = require('../libs/auth');

const {home, account, profile, userActions} = require('../controllers');

router.get('/', home);

// account module
router.post('/signup', account.userSignUp);
router.post('/login', account.userLogin);
router.post('/update-password', auth.verifyToken, account.userUpdatePassword);

router.post('/me', profile.myProfile);

//user actions routes
router.post('/user/:id/like', userActions.likeUser);


module.exports = router;