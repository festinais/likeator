const
    express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth');

const {home, account, profile, userActions} = require('../controllers');

router.get('/', home.home);
router.get('/profile', home.profile);
router.get('/view-users', home.users);
// router.get('/most-liked', home.mostLiked);



// account module
router.post('/signup', account.userSignUp);
router.post('/login', account.userLogin);
router.post('/update-password', auth.verifyToken, account.userUpdatePassword);

router.post('/me', auth.verifyToken, profile.myProfile);
router.get('/users', profile.usersList);


//user actions routes
router.post('/user/:id/like', auth.verifyToken, userActions.likeActionHandler);
router.post('/user/:id/unlike', auth.verifyToken, userActions.likeActionHandler);
router.post('/user/:id', userActions.getUser);
router.get('/most-liked', userActions.mostLiked);



module.exports = router;