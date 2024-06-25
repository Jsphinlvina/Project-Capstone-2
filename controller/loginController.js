const bcrypt = require('bcrypt');
const passport = require('passport');
const Users = require('../model/Users');
const Mahasiswa = require('../model/Mahasiswa');

const login = (req, res) => {
    res.render('login', { error: req.flash('error') });
};

const authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error', 'Email atau password salah');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) return next(err);

            const role = user.role_id.toString(); // Convert role_id to string for comparison
            if (role === '1') {
                return res.redirect('/administrator/dashboard');
            } else if (role === '2') {
                return res.redirect('/fakultas/dashboard');
            } else if (role === '3') {
                return res.redirect('/programStudi/dashboard');
            } else if (role === '4') {
                return res.redirect('/mahasiswa/dashboard');
            } else {
                req.logout();
                req.flash('error', 'Role tidak valid atau akses tidak diizinkan');
                return res.redirect('/login');
            }
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    });
};

module.exports = { login, authenticate, logout };
