const path = require('path');

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import routes
const gameRoutes = require('./routes/game');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(gameRoutes);
app.use(authRoutes);

// Handling 404, 500 case
app.use((req, res, next) => {
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
    res.redirect('/500');
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