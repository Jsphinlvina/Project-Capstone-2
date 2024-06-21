const ProgramStudi = require('../model/ProgramStudi')

const index = (req, res) => {
    const success = req.session.success || ''
    delete req.session.success
    new ProgramStudi().all((programStudies) => {
        res.render('programStudi/index', {
            programStudies: programStudies,
            success: success
        })
    })
}

const create = (req, res) => {
    res.render('programStudi/create')
}

const store = (req, res) => {
    const programStudi = {
        id: req.body.id,
        name: req.body.name
    }

    new ProgramStudi().save(programStudi, (result) => {
        req.session.success = `Program Studi ${programStudi.name} berhasil ditambahkan`
        res.redirect('/programStudi')
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new ProgramStudi().edit(id, (programStudi) => {
        res.render('programStudi/edit', {programStudi: programStudi})
    })
}

const update = (req, res) => {
    const programStudi = {
        id: req.body.id,
        name: req.body.name
    }

    new ProgramStudi().update(programStudi, (result) => {
        req.session.success = `ProgramStudi ${programStudi.id} berhasil diubah`
        res.redirect('/programStudi')
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new ProgramStudi().delete(id, (role) => {
        req.session.success = `Program Studi ${id} berhasil dihapus`
        res.redirect('/programStudi')
    })
}

module.exports = {index, create, store, edit, update, destroy}