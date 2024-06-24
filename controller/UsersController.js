const bcrypt = require('bcrypt');
const Users = require('../model/Users');
const Roles = require("../model/Roles");

const index = (req, res) => {
    new Users().all((err, users) => {
        let usersData = [];
        let processed = 0;

        if (!users || users.length === 0) {
            return res.render('users/index', {
                users: usersData,
                success: req.session.success || '',
                error: req.session.error || ''
            });
        }

        users.forEach(user => {
            new Users().role(user.role_id, (err, role) => {

                user.role = role;

                new Users().program_studi(user.program_studi_id, (err, programStudi) => {

                    user.program_studi = programStudi;

                    usersData.push(user);
                    processed++;

                    if (processed === users.length) {
                        res.render('users/index', {
                            users: usersData,
                            success: req.session.success || '',
                            error: req.session.error || ''
                        });
                    }
                });
            });
        });
    });
}

const create = (req, res) => {
    res.render('users/create');
}

const store = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        const user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            status: req.body.status,
            role_id: req.body.role_id,
            program_studi: req.body.program_studi
        }

        new Users().save(user, (result) => {
            req.session.success = `User ${user.name} telah berhasil ditambahkan`;
            res.redirect('/users');
        });
    });
}

const edit = (req, res) => {
    const id = req.params.id;
    new Users().edit(id, (err, user) => {
        res.render('users/edit', {user: user});
    });
}

const update = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        const user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            status: req.body.status,
            role_id: req.body.role_id,
            program_studi: req.body.program_studi
        }

        new Users().update(user, (err, result) => {
            req.session.success = `User ${user.id} berhasil diubah`;
            res.redirect('/users');
        });
    });
}

const destroy = (req, res) => {
    const id = req.params.id;
    new Users().delete(id, (err, result) => {

        req.session.success = `User ${id} berhasil dihapus`;
        res.redirect('/users');
    });
}

module.exports = {index, create, store, edit, update, destroy};
