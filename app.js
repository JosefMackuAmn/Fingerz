const path = require('path');

const User = require('./models/user');

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ash = require('express-async-handler');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

// Import routes
const gameRoutes = require('./routes/game');
const authRoutes = require('./routes/auth');

const app = express();

// Setting store for sessions
const store = new MongoDBStore({
    uri: `${process.env.MONGO_CONN_STRING}`,
    collection: 'sessions'
});
// CSRF protection
const csrfProtection = csrf();

// Defining view engine
app.set('view engine', 'ejs');

// Parsing urlencoded body
app.use(bodyParser.urlencoded({ extended: false }));
// Serving static public folder
app.use(express.static(path.join(__dirname, 'public')));
// Creating session
app.use(session({
    secret: `${process.env.SESSION_SECRET_STRING}`,
    resave: false,
    saveUninitialized: false,
    store: store
}));
// After creating session using CSRF protection
app.use(csrfProtection);


app.use(ash(async (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    const userDoc = await User.findById(req.session.user._id);
    if (!userDoc) {
        return next();
    }
    req.user = userDoc;
}));

// Use routes
app.use(gameRoutes);
app.use(authRoutes);

// Handling 404, 500 case
app.get('/500', (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: "500"
    })
})
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: "404"
    })
})

// Handling next(err)
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500', {
        pageTitle: '500'
    });
})

mongoose
    .connect(
        `${process.env.MONGO_CONN_STRING}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    })