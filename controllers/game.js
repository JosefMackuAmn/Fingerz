exports.getIndex = (req, res, next) => {
    res.render('game/index', {
        pageTitle: "Home"
    })
}

exports.getSea = (req, res, next) => {
    res.render('game/sea', {
        pageTitle: "Sea map"
    })
}