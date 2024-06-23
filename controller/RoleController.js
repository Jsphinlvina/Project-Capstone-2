const Roles = require('../model/Roles')
const Fakultas = require("../model/Fakultas");

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new Roles().all((roles) => {
        res.render('role/index', {
            roles: roles,
            success: success,
            error: error
        })
    })
}

const create = (req, res) => {
    res.render('role/create')
}

const store = (req, res) => {
    const role = {
        id: req.body.id,
        name: req.body.name
    }

    new Roles().findID(role.id, (existingID) => {
        if (existingID) {
            req.session.error = `Role dengan ID ${role.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/role');
        }

        new Roles().findName(role.name, (existingName) => {
            if (existingName) {
                req.session.error = `Role dengan Nama ${role.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/role');
            }

            new Roles().save(role, (result) => {
                req.session.success = `Role ${role.name} berhasil ditambahkan`;
                res.redirect('/role');
            })
        })
    })
}


const edit = (req, res) => {
    const id = req.params.id
    new Roles().edit(id, (role) => {
        res.render('role/edit', {role: role})
    })
}

const update = (req, res) => {
    const role = {
        id: req.body.id,
        name: req.body.name
    }

     new Roles().findName(role.name, (existingName) => {
         if (existingName) {
             req.session.error = `Role dengan Nama ${role.name} sudah ada, silakan gunakan Nama lain.`;
             return res.redirect('/role');
         }

         new Roles().update(role, (result) => {
             req.session.success = `Role ${role.id} berhasil diubah`
             res.redirect('/role')
         })
     })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Roles().delete(id, (role) => {
        req.session.success = `Role ${id} berhasil dihapus`
        res.redirect('/role')
    })
}

module.exports = {index, create, store, edit, update, destroy}