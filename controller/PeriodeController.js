const Periode = require('../model/Periode')

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new Periode().all((periodes) => {
        res.render('periode/index', {
            periodes: periodes,
            success: success,
            error: error
        })
    })
}

const create = (req, res) => {
    res.render('periode/create')
}

const store = (req, res) => {
    const periode = {
        id: req.body.id,
        name: req.body.name
    }

    new Periode().findID(periode.id, (existingID) => {
        if (existingID) {
            req.session.error = `Periode dengan ID ${periode.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/periode');
        }

        new Periode().findName(periode.name, (existingName) => {
            if (existingName) {
                req.session.error = `Periode dengan Nama ${periode.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/periode');
            }

            new Periode().save(periode, (result) => {
                req.session.success = `Periode ${periode.name} berhasil ditambahkan`;
                res.redirect('/periode');
            })
        })
    })
}
const edit = (req, res) => {
    const id = req.params.id
    new Periode().edit(id, (periode) => {
        res.render('periode/edit', {periode: periode})
    })
}

const update = (req, res) => {
    const periode = {
        id: req.body.id,
        name: req.body.name
    }

    new Periode().findName(periode.name, (existingName) => {
        if (existingName) {
            req.session.error = `Periode dengan Nama ${periode.name} sudah ada, silakan gunakan Nama lain.`;
            return res.redirect('/periode');
        }

        new Periode().update(periode, (result) => {
            req.session.success = `Periode ${periode.id} berhasil diubah`
            res.redirect('/periode')
        })
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Periode().delete(id, (periode) => {
        req.session.success = `Periode ${id} berhasil dihapus`
        res.redirect('/periode')
    })
}

module.exports = {index, create, store, edit, update, destroy}