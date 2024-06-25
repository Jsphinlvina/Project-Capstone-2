const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../model/Users');

const User = new Users();

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findBy('email', email, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'Email tidak terdaftar' });

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password salah' });
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findBy('id', id, (err, user) => {
            done(err, user);
        });
    });
};
