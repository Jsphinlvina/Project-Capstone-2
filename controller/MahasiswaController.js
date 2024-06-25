const bcrypt = require('bcrypt');
const Mahasiswa = require('../model/Mahasiswa');
const Roles = require("../model/Roles");
const ProgramStudi = require('../model/ProgramStudi')


const index = (req, res) => {
    new Mahasiswa().all((err, users) => {
        let usersData = [];
        let processed = 0;

        if (!users || users.length === 0) {
            return res.render('mahasiswa/index', {
                mahasiswas: usersData,
                success: req.session.success || '',
                error: req.session.error || ''
            });
        }

        users.forEach(user => {
            new Mahasiswa().role(user.role_id, (err, role) => {

                user.role = role;

                new Mahasiswa().program_studi(user.program_studi_id, (err, programStudi) => {

                    user.program_studi = programStudi;

                    usersData.push(user);
                    processed++;

                    if (processed === users.length) {
                        res.render('mahasiswa/index', {
                            mahasiswas: usersData,
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
            res.render('mahasiswa/create', {
                roles: roles,
                program_studi: program_studi
            })
        })
    })
}

const store = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            req.session.error = 'Error hashing password';
            return res.redirect('/mahasiswa/create');
        }

        const mahasiswa = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            program_studi_id: req.body.program_studi_id,
            role_id: req.body.role_id,
            ipk: req.body.ipk,
            angkatan: req.body.angkatan,
            no_tlp: req.body.no_tlp,
            alamat: req.body.alamat
        }

        console.log(mahasiswa)

        new Mahasiswa().save(mahasiswa, (result, err) => {
            if (err) {
                req.session.error = 'Error saving mahasiswa';
                return res.redirect('/mahasiswa/create');
            }
            req.session.success = `Mahasiswa ${mahasiswa.name} telah berhasil ditambahkan`;
            res.redirect('/mahasiswa');
        });
    });
}

const edit = (req, res) => {
    const id = req.params.id;
    new Mahasiswa().edit(id, (err, mahasiswa) => {
        new Roles().all((roles) => {
            new ProgramStudi().all((program_studi) => {
                res.render('mahasiswa/edit', {
                    mahasiswa: mahasiswa,
                    roles: roles,
                    program_studi: program_studi
                })
            })
        })
    })
}


const update = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        const mahasiswa = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            program_studi_id: req.body.program_studi_id,
            role_id: req.body.role_id,
            ipk : req.body.ipk,
            angkatan : req.body.angkatan,
            no_tlp  : req.body.no_tlp,
            alamat : req.body.alamat
        }

        new Mahasiswa().update(mahasiswa, (err, result) => {
            req.session.success = `Mahasisswa ${mahasiswa.id} berhasil diubah`;
            res.redirect('/mahasiswa');
        });
    });
}

const destroy = (req, res) => {
    const id = req.params.id;
    new Mahasiswa().delete(id, (err, result) => {

        req.session.success = `Mahasisswa ${id} berhasil dihapus`;
        res.redirect('/mahasiswa');
    });
}

module.exports = {index, create, store, edit, update, destroy};
