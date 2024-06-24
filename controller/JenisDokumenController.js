const JenisDokumen = require('../model/JenisDokumen')

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new JenisDokumen().all((jenisDokumens) => {
        res.render('fakultas/index', {
            jenisDokumens: jenisDokumens,
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

    new JenisDokumen().findID(fakultas.id, (existingID) => {
        if (existingID) {
            req.session.error = `JenisDokumen dengan ID ${fakultas.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/fakultas');
        }

        new JenisDokumen().findName(fakultas.name, (existingName) => {
            if (existingName) {
                req.session.error = `JenisDokumen dengan Nama ${fakultas.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/fakultas');
            }

            new JenisDokumen().save(fakultas, (result) => {
                req.session.success = `JenisDokumen ${fakultas.name} berhasil ditambahkan`;
                res.redirect('/fakultas');
            })
        })
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new JenisDokumen().edit(id, (fakultas) => {
        res.render('fakultas/edit', {fakultas: fakultas})
    })
}

const update = (req, res) => {
    const fakultas = {
        id: req.body.id,
        name: req.body.name
    }

    new JenisDokumen().findName(fakultas.name, (existingName) => {
        if (existingName) {
            req.session.error = `JenisDokumen dengan Nama ${fakultas.name} sudah ada, silakan gunakan Nama lain.`;
            return res.redirect('/fakultas');
        }

        new JenisDokumen().update(fakultas, (result) => {
            req.session.success = `JenisDokumen ${fakultas.id} berhasil diubah`
            res.redirect('/fakultas')
        })
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new JenisDokumen().delete(id, (fakultas) => {
        req.session.success = `JenisDokumen ${id} berhasil dihapus`
        res.redirect('/fakultas')
    })
}

module.exports = {index, create, store, edit, update, destroy}