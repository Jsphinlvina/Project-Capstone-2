const Fakultas = require('../model/Fakultas')

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new Fakultas().all((fakultass) => {
        res.render('fakultas/index', {
            fakultass: fakultass,
            success: success,
            error: error
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

    new Fakultas().findID(fakultas.id, (existingID) => {
        if (existingID) {
            req.session.error = `Fakultas dengan ID ${fakultas.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/fakultas');
        }

        new Fakultas().findName(fakultas.name, (existingName) => {
            if (existingName) {
                req.session.error = `Fakultas dengan Nama ${fakultas.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/fakultas');
            }

            new Fakultas().save(fakultas, (result) => {
                req.session.success = `Fakultas ${fakultas.name} berhasil ditambahkan`;
                res.redirect('/fakultas');
            })
        })
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

    new Fakultas().findName(fakultas.name, (existingName) => {
        if (existingName) {
            req.session.error = `Fakultas dengan Nama ${fakultas.name} sudah ada, silakan gunakan Nama lain.`;
            return res.redirect('/fakultas');
        }

        new Fakultas().update(fakultas, (result) => {
            req.session.success = `Fakultas ${fakultas.id} berhasil diubah`
            res.redirect('/fakultas')
        })
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Fakultas().delete(id, (fakultas) => {
        req.session.success = `Fakultas ${id} berhasil dihapus`
        res.redirect('/fakultas')
    })
}

module.exports = {index, create, store, edit, update, destroy}