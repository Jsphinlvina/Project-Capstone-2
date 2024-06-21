const Fakultas = require('../model/Fakultas')

const index = (req, res) => {
    const success = req.session.success || ''
    delete req.session.success
    new Fakultas().all((fakultass) => {
        res.render('fakultas/index', {
            fakultass: fakultass,
            success: success
        })
    })
}

const create = (req, res) => {
    res.render('fakultas/create')
}

const store = (req, res) => {
    const fakultas = {
        id: req.body.id,
        name: req.body.name
    }

    new Fakultas().save(fakultas, (result) => {
        req.session.success = `Fakultas ${fakultas.name} berhasil ditambahkan`
        res.redirect('/fakultas')
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new Fakultas().edit(id, (fakultas) => {
        res.render('fakultas/edit', {fakultas: fakultas})
    })
}

const update = (req, res) => {
    const fakultas = {
        id: req.body.id,
        name: req.body.name
    }

    new Fakultas().update(fakultas, (result) => {
        req.session.success = `Fakultas ${fakultas.id} berhasil diubah`
        res.redirect('/fakultas')
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Fakultas().delete(id, (role) => {
        req.session.success = `Fakultas ${id} berhasil dihapus`
        res.redirect('/fakultas')
    })
}

module.exports = {index, create, store, edit, update, destroy}