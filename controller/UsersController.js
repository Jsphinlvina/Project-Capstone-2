const bcrypt = require('bcrypt');
const Users = require('../model/Users');
const Roles = require("../model/Roles");
const ProgramStudi = require('../model/ProgramStudi')


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
    new Roles().all((roles) => {
        new ProgramStudi().all((program_studi) => {
            res.render('users/create', {
                roles: roles,
                program_studi: program_studi
            })
        })
    })
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
            program_studi_id: req.body.program_studi_id
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

        new Users().program_studi(user.program_studi_id, (err, program_studi) => {
            user.program_studi = program_studi

            new Users().role(user.role_id, (err, role) => {
                user.role = role

                new ProgramStudi().all((program_studi) => {
                    new Roles().all((roles) => {
                        res.render('users/edit', {
                            user: user,
                            program_studi: program_studi,
                            roles: roles
                        })
                    })
                })
            })
        })
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
            program_studi_id: req.body.program_studi_id
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
