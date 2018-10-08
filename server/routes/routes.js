const express = require('express');
const router = express.Router();

const {home, account, profile, userActions} = require('../controllers');

router.get('/', home);

// account module
router.post('/signup', account.userSignUp);
router.post('/login', account.userLogin);
router.post('/update-password', account.userUpdatePassword);
router.post('/me', profile.myProfile);

//user actions routes
router.post('/user/:id/like', userActions.likeUser);

// router.post('/user/:id/', usersOps.listUsersn);

// router.post('/user/:id/unlike', usersOps.listUsers);
// router.get('/most-liked', usersOps.listUsers);

module.exports = router;