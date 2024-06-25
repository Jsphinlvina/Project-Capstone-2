const express = require('express');
const session = require('express-session');
const router = require('./routes/route');
//tambahan
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

//tambahan
// Passport Config
require('./config/passport')(passport)

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

//tambahan
// Connect flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(router);

app.listen(8000, () => {
    console.log('Server running at port 8000');
});
