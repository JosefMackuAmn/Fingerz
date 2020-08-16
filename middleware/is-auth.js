module.exports = (req, res, next) => {
    /* if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    } */ // For development purposes commented out
    next();
}