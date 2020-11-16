const passedToViews = require('../util/passed-to-views');

exports.getIndex = (req, res, next) => {
    res.render('game/index', {
        ...passedToViews(req, "Home")
    });
}

exports.getSea = (req, res, next) => {
    res.render('game/sea', {
        ...passedToViews(req, "Sea map")
    });
}