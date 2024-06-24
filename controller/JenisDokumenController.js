const JenisDokumen = require('../model/JenisDokumen')

const index = (req, res) => {
    const success = req.session.success || ''
    const error = req.session.error || ''
    delete req.session.success
    delete req.session.error
    new JenisDokumen().all((jenisDokumens) => {
        res.render('jenisDokumen/index', {
            jenisDokumens: jenisDokumens,
            success: success,
            error: error
        })
    })
}

const create = (req, res) => {
    res.render('jenisDokumen/create')
}

const store = (req, res) => {
    const jenisDokumen = {
        id: req.body.id,
        name: req.body.name
    }

    new JenisDokumen().findID(jenisDokumen.id, (existingID) => {
        if (existingID) {
            req.session.error = `Jenis Dokumen dengan ID ${jenisDokumen.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/jenisDokumen');
        }

        new JenisDokumen().findName(jenisDokumen.name, (existingName) => {
            if (existingName) {
                req.session.error = `Jenis Dokumen dengan Nama ${jenisDokumen.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/jenisDokumen');
            }

            new JenisDokumen().save(jenisDokumen, (result) => {
                req.session.success = `JenisDokumen ${jenisDokumen.name} berhasil ditambahkan`;
                res.redirect('/jenisDokumen');
            })
        })
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new JenisDokumen().edit(id, (jenisDokumen) => {
        res.render('jenisDokumen/edit', {jenisDokumen: jenisDokumen})
    })
}

const update = (req, res) => {
    const jenisDokumen = {
        id: req.body.id,
        name: req.body.name
    }

    new JenisDokumen().findName(jenisDokumen.name, (existingName) => {
        if (existingName) {
            req.session.error = `Jenis Dokumen dengan Nama ${jenisDokumen.name} sudah ada, silakan gunakan Nama lain.`;
            return res.redirect('/jenisDokumen');
        }

        new JenisDokumen().update(jenisDokumen, (result) => {
            req.session.success = `Jenis Dokumen ${jenisDokumen.id} berhasil diubah`
            res.redirect('/jenisDokumen')
        })
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new JenisDokumen().delete(id, (jenisDokumen) => {
        req.session.success = `Jenis Dokumen ${id} berhasil dihapus`
        res.redirect('/jenisDokumen')
    })
}

module.exports = {index, create, store, edit, update, destroy}