const Status = require('../model/Status')
const Periode = require('../model/Periode')
const JenisBeasiswa = require('../model/JenisBeasiswa')

const index = (req, res) => {
    new Status().all((statuss) => {
        let statusData = []
        let processed = 0

        if (!statuss || statuss.length === 0) {
            return res.render('status/index', {
                statuss: statusData,
                success: req.session.success || '',
                error: req.session.error || ''
            });
        }

        statuss.forEach(status => {
            new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenis_beasiswa) => {
                status.jenis_beasiswa = jenis_beasiswa

                new Status().periode(status.periode_id, (err, periode) => {
                    status.periode = periode

                    statusData.push(status)
                    processed++

                    if (processed === statuss.length) {
                        const success = req.session.success || ''
                        const error = req.session.error || ''
                        delete req.session.success
                        delete req.session.error

                        res.render('status/index', {
                            statuss: statuss,
                            success: success,
                            error: error
                        })
                    }
                })
            })
        })
    })
}

const create = (req, res) => {
    new Periode().all((periode) => {
        new JenisBeasiswa().all((jenisBeasiswa) => {
            res.render('status/create', {
                periode: periode,
                jenisBeasiswa: jenisBeasiswa
            })
        })
    })
}

const store = (req, res) => {
    const status = {
        id: req.body.id,
        jenis_beasiswa_id: req.body.jenis_beasiswa_id,
        periode_id: req.body.periode_id,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_akhir: req.body.tanggal_akhir,
        status: req.body.status
    }

    new Status().findByJenisBeasiswaAndPeriode(status.jenis_beasiswa_id, status.periode_id, (existingStatus) => {
        if (existingStatus) {
            req.session.error = `Status untuk jenis beasiswa ${status.jenis_beasiswa_id} dan periode ${status.periode_id} sudah ada.`;
            return res.redirect('/status');
        }

        new Status().save(status, (result) => {
            req.session.success = `Status ${status.name} berhasil ditambahkan`;
            res.redirect('/status');
        })
    })
}

const edit = (req, res) => {
    const id = req.params.id
    new Status().edit(id, (status) => {

        new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenisBeasiswa)=>{
            status.jenis_beasiswa = jenisBeasiswa

            new Status().periode(status.periode_id, (err, periode)=>{
                status.periode = periode

                new Periode().all((periode) => {
                    new JenisBeasiswa().all((jenisBeasiswa) => {
                        res.render('status/create', {
                            periode: periode,
                            jenisBeasiswa: jenisBeasiswa
                        })
                    })
                })
            })
        })
    })
}

const update = (req, res) => {
    const status = {
        jenis_beasiswa_id: req.body.jenis_beasiswa_id,
        periode_id: req.body.periode_id,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_akhir: req.body.tanggal_akhir,
        status: req.body.status
    }

    new Status().update(status, (result) => {
        req.session.success = `Status Periode ${status.id} berhasil diubah`
        res.redirect('/status')
    })
}

const destroy = (req, res) => {
    const id = req.params.id
    new Status().delete(id, (status) => {
        req.session.success = `Status Periode ${id} berhasil dihapus`
        res.redirect('/status')
    })
}

module.exports = {index, create, store, edit, update, destroy}