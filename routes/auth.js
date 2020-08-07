const router = require('express').Router();
const ash = require('express-async-handler');

const authController = require('../controllers/auth');

router.get('/signup', ash(authController.getSignup));
router.post('/signup', ash(authController.postSignup));

router.get('/login', ash(authController.getLogin));
// router.post('/login', ash(authController.postLogin));

router.get('/stats', ash(authController.getStats));
router.get('/achievements', ash(authController.getAchievements));

router.get('/palm', ash(authController.getPalm));
// router.post('/palm', ash(authController.postPalm));

router.get('/options', ash(authController.getOptions));
// router.post('/options', ash(authController.postOtions));

module.exports = router;