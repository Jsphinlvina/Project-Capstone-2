const JenisBeasiswa = require('../model/JenisBeasiswa')

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new JenisBeasiswa().all((jenisBeasiswas) => {
        res.render('jenisBeasiswa/index', {
            jenisBeasiswas: jenisBeasiswas,
            success: success,
            error: error
        })
    })
}

const create = (req, res) => {
    res.render('jenisBeasiswa/create')
}

const store = (req, res) => {
    const jenisBeasiswa = {
        id: req.body.id,
        name: req.body.name
    }

    new JenisBeasiswa().findID(jenisBeasiswa.id, (existingID) => {
        if (existingID) {
            req.session.error = `Jenis Beasiswa dengan ID ${jenisBeasiswa.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/jenisBeasiswa');
        }

        new JenisBeasiswa().findName(jenisBeasiswa.name, (existingName) => {
            if (existingName) {
                req.session.error = `Jenis Beasiswa dengan Nama ${jenisBeasiswa.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/jenisBeasiswa');
            }

            new JenisBeasiswa().save(jenisBeasiswa, (result) => {
                req.session.success = `Jenis Beasiswa ${jenisBeasiswa.name} berhasil ditambahkan`;
                res.redirect('/jenisBeasiswa');
            })
        })
    })
}
const edit = (req, res) => {
    const id = req.params.id
    new JenisBeasiswa().edit(id, (jenisBeasiswa) => {
        res.render('jenisBeasiswa/edit', {jenisBeasiswa: jenisBeasiswa})
    })
}

const update = (req, res) => {
    const jenisBeasiswa = {
        id: req.body.id,
        name: req.body.name
    }

    new JenisBeasiswa().findName(jenisBeasiswa.name, (existingName) => {
        if (existingName) {
            req.session.error = `Jenis Beasiswa dengan Nama ${jenisBeasiswa.name} sudah ada, silakan gunakan Nama lain.`;
            return res.redirect('/jenisBeasiswa');
        }

        new JenisBeasiswa().update(jenisBeasiswa, (result) => {
            req.session.success = `Jenis Beasiswa ${jenisBeasiswa.id} berhasil diubah`
            res.redirect('/jenisBeasiswa')
        })
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new JenisBeasiswa().delete(id, (jenisBeasiswa) => {
        req.session.success = `Jenis Beasiswa ${id} berhasil dihapus`
        res.redirect('/jenisBeasiswa')
    })
}

module.exports = {index, create, store, edit, update, destroy}