const ProgramStudi = require('../model/ProgramStudi')
const Fakultas = require('../model/Fakultas')

const index = (req, res) => {
    new ProgramStudi().all((programStudies) => {
        let programStudiData = []
        let processed = 0

        // if (!programStudies || programStudies.length === 0) {
        //     return res.render('programStudi/index', {
        //         programStudies: programStudiData,
        //         success: req.session.success || '',
        //         error: req.session.error || ''
        //     });
        // }

        programStudies.forEach(programStudi => {
            new ProgramStudi().fakultas(programStudi.id, (err, fakultass) => {

                programStudi.fakultas = fakultass
                console.log(fakultass)
                programStudiData.push(programStudi)
                processed++

                if (processed === programStudies.length) {
                    const success = req.session.success || ''
                    const error = req.session.error || ''
                    delete req.session.success
                    delete req.session.error
                    console.log(programStudies)

                    res.render('programStudi/index', {
                        programStudies: programStudies,
                        success: success,
                        error: error
                    })
                }
            })
        })
    })
}

const create = (req, res) => {
    new Fakultas().all((fakultass) => {
        res.render('programStudi/create', {fakultass: fakultass})
    })
}

const store = (req, res) => {
    const programStudi = {
        id: req.body.id,
        name: req.body.name,
        fakultas_id: req.body.fakultas_id
    }

    new ProgramStudi().findID(programStudi.id, (existingID) => {
        if (existingID) {
            req.session.error = `ProgramStudi dengan ID ${programStudi.id} sudah ada, silakan gunakan ID lain.`;
            return res.redirect('/programStudi');
        }

        new ProgramStudi().findName(programStudi.name, (existingName) => {
            if (existingName) {
                req.session.error = `ProgramStudi dengan Nama ${programStudi.name} sudah ada, silakan gunakan Nama lain.`;
                return res.redirect('/programStudi');
            }

            new ProgramStudi().save(programStudi, (result) => {
                req.session.success = `ProgramStudi ${programStudi.name} berhasil ditambahkan`;
                res.redirect('/programStudi');
            })
        })
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new ProgramStudi().edit(id, (programStudi) => {

        new ProgramStudi().fakultas(programStudi.fakultas_id, (err, fakultas) => {
            programStudi.fakultas = fakultas

            new Fakultas().all((fakultass) => {
                res.render('programStudi/edit', {
                    programStudi: programStudi,
                    fakultass: fakultass
                })
            })
        })

    })
}

const update = (req, res) => {
    const programStudi = {
        id: req.body.id,
        name: req.body.name,
        fakultas_id: req.body.fakultas_id
    }

    new ProgramStudi().update(programStudi, (result) => {
        req.session.success = `ProgramStudi ${programStudi.id} berhasil diubah`
        res.redirect('/programStudi')
    })

}

const destroy = (req, res) => {
    const id = req.params.id
    new ProgramStudi().delete(id, (programStudi) => {
        req.session.success = `ProgramStudi ${id} berhasil dihapus`
        res.redirect('/programStudi')
    })
}

module.exports = {index, create, store, edit, update, destroy}