const User = require('../models/user');

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