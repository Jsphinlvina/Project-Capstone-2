const Users = require('../model/Users')
const Roles = require("../model/Roles");

const index = (req, res) => {
    const success = req.session.success || ''
    delete req.session.success
    new Users().all((users) => {
        res.render('/users/index', {
            users: users,
            success: success
        })
    })
}

const create = (req, res) => {
    res.render('users/create')
}

const store = (req, res) => {
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        role_id: req.body.role_id,
        program_studi: req.body.program_studi
    }

    new Users().save(user, (result) => {
        req.session.success = `User ${user.name} telah berhasil ditambahkan`
        res.redirect('/users')
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new Users().edit(id, (user) => {
        res.render('users/edit', {user: user})
    })
}

const update = (req, res) => {
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        role_id: req.body.role_id,
        program_studi: req.body.program_studi
    }

    new Users().update(user, (result) => {
        req.session.success = `User ${user.id} berhasil diubah`
        res.redirect('/users')
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Users().delete(id, (user) => {
        req.session.success = `User ${id} berhasil dihapus`
        res.redirect('/users')
    })
}

module.exports = {index, create, store, edit, update, destroy}