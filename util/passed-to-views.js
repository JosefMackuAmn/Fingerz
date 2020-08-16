// Return object passed to all views
module.exports = (req, pageTitle, err = null) => {
    return {
        pageTitle: pageTitle,
        isAuth: req.session.isLoggedIn || false,
        csrfToken: req.csrfToken(),
        errorMsg: err
    }
}