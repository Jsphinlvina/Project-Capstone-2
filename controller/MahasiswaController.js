const bcrypt = require('bcrypt');
const Mahasiswa = require('../model/Mahasiswa');
const Roles = require("../model/Roles");
const ProgramStudi = require('../model/ProgramStudi')


const index = (req, res) => {
    new Mahasiswa().all((err, mahasiswa) => {
        let mahasiswaData = [];
        let processed = 0;

        if (!mahasiswa || mahasiswa.length === 0) {
            return res.render('mahasiswa/index', {
                mahasiswas: mahasiswaData,
                success: req.session.success || '',
                error: req.session.error || ''
            });
        }

        mahasiswa.forEach(mahasiswa => {
            new Mahasiswa().role(mahasiswa.role_id, (err, role) => {

                mahasiswa.role = role;

                new Mahasiswa().program_studi(mahasiswa.program_studi_id, (err, programStudi) => {

                    mahasiswa.program_studi = programStudi;

                    mahasiswaData.push(mahasiswa);
                    processed++;

                    if (processed === mahasiswa.length) {
                        res.render('mahasiswa/index', {
                            mahasiswas: mahasiswa,
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

        const mahasiswa = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            status: req.body.status,
            role_id: req.body.role_id,
            program_studi_id: req.body.program_studi_id
        }

        console.log(mahasiswa)

        new Mahasiswa().save(mahasiswa, (result) => {
            req.session.success = `Mahasisswa ${mahasiswa.name} telah berhasil ditambahkan`;
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
            status: req.body.status,
            role_id: req.body.role_id,
            program_studi_id: req.body.program_studi_id
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
