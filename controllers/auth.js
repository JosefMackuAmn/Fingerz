const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const passedToViews = require('../util/passed-to-views');

exports.getSignup = async (req, res, next) => {
    res.render('auth/signup', {
        ...passedToViews(req, 'Sign up'),
        oldInput: {
            email: "",
            nickname: ""
        }
    })
}

exports.postSignup = async (req, res, next) => {
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            ...passedToViews(req, 'Sign up', errors.array()),
            oldInput: {
                email: email,
                nickname: nickname
            }
        })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        nickname: nickname,
        email: email,
        password: hashedPassword
    });
    await user.save();

    res.redirect('/login');
}

exports.getLogin = async (req, res, next) => {
    res.render('auth/login', {
        ...passedToViews(req, 'Login'),
        oldInput: {
            email: '',
            password: ''
        }
    })
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('/login', {
            ...passedToViews(req, 'Login', errors.array()),
            oldInput: {
                email: email,
                password: password
            }
        })
    }

    const userDoc = await User.findOne({email: email});
    if (!userDoc) {
        return res.redirect('/login');
    }

    const doMatch = await bcrypt.compare(password, userDoc.password);
    if (!doMatch) {
        return res.redirect('/login');
    }

    req.session.isLoggedIn = true;
    req.session.user = userDoc;
    req.session.save((err) => {
        return res.redirect('/');
    })
}

exports.postLogout = async (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
}

exports.getStats = async (req, res, next) => {
    res.render('auth/stats', {
        ...passedToViews(req, 'Stats')
    })
}

exports.getAchievements = async (req, res, next) => {
    res.render('auth/achievements', {
        ...passedToViews(req, 'Achievements')
    })
}

exports.getPalm = async (req, res, next) => {
    res.render('auth/palm', {
        ...passedToViews(req, 'Palm')
    })
}

exports.getOptions = async (req, res, next) => {
    res.render('auth/options', {
        ...passedToViews(req, 'Options')
    })
}