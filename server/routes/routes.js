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

router.post('/me', auth.verifyToken, profile.myProfile);

//user actions routes
router.post('/user/:id/like', auth.verifyToken, userActions.likeUser);
router.post('/user/:id/unlike', auth.verifyToken, userActions.unLikeUser);
router.post('/user/:id', userActions.getUser);
router.post('/most-liked', userActions.mostLiked);



module.exports = router;