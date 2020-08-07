const User = require('../models/user');

exports.getSignup = async (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign up'
    })
}

exports.postSignup = async (req, res, next) => {
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        nickname: nickname,
        email: email,
        password: password
    });
    await user.save();
}

exports.getLogin = async (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
}

exports.getStats = async (req, res, next) => {
    res.render('auth/stats', {
        pageTitle: 'Stats'
    })
}

exports.getAchievements = async (req, res, next) => {
    res.render('auth/achievements', {
        pageTitle: 'Achievements'
    })
}

exports.getPalm = async (req, res, next) => {
    res.render('auth/palm', {
        pageTitle: 'Palm'
    })
}

exports.getOptions = async (req, res, next) => {
    res.render('auth/options', {
        pageTitle: 'Options'
    })
}