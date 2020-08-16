const router = require('express').Router();
const ash = require('express-async-handler');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

router.get('/signup', ash(authController.getSignup));
router.post('/signup',
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('The email is not valid')
        .custom((value, { req }) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email is already taken');
                    }
                })
        })
        .escape(),
    body('password')
        .isLength({min: 8})
        .withMessage('Password should be at least 8 characters long')
        .escape(),
    ash(authController.postSignup)
);

router.get('/login', ash(authController.getLogin));
router.post('/login',
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('The email is not valid')
        .escape(),
    body('password')
        .escape(),
    ash(authController.postLogin)
);

router.post('/logout', ash(authController.postLogout));

router.get('/stats', isAuth, ash(authController.getStats));
router.get('/achievements', isAuth, ash(authController.getAchievements));

router.get('/palm', isAuth, ash(authController.getPalm));
// router.post('/palm', isAuth, ash(authController.postPalm));

router.get('/options', isAuth, ash(authController.getOptions));
// router.post('/options', isAuth, ash(authController.postOtions));

module.exports = router;