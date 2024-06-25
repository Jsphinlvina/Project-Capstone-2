const Status = require('../model/Status')
const Periode = require('../model/Periode')
const JenisBeasiswa = require('../model/JenisBeasiswa')

const formatDateIndex = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

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
            new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenis_beasiswas) => {
                status.jenis_beasiswas = jenis_beasiswas

                new Status().periode(status.periode_id, (err, periode) => {
                    status.periode = periode


                    status.tanggal_mulai = formatDateIndex(status.tanggal_mulai);
                    status.tanggal_akhir = formatDateIndex(status.tanggal_akhir);

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
    new Periode().all((periodes) => {
        new JenisBeasiswa().all((jenisBeasiswas) => {
            res.render('status/create', {
                periodes: periodes,
                jenisBeasiswas: jenisBeasiswas
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

    new Status().findID(status.id, (existingID) => {
        if (existingID) {
            req.session.error = `Pengaturan Periode ID ${status.id} sudah ada`;
            return res.redirect('/status');
        }

        new Status().findByJenisBeasiswaAndPeriode(status.jenis_beasiswa_id, status.periode_id, (err, existingStatus) => {
            if (existingStatus) {
                req.session.error = `Pengaturan Periode untuk jenis beasiswa ${status.jenis_beasiswa_id} dan periode ${status.periode_id} sudah ada.`;
                return res.redirect('/status');
            }
            console.log('Data yang diterima untuk update:', status);
            new Status().save(status, (result) => {
                req.session.success = `Status ${status.id} berhasil ditambahkan`;
                res.redirect('/status');
            })
        })
    })
}


const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
};

const edit = (req, res) => {
    const id = req.params.id
    new Status().edit(id, (status) => {
        status.tanggal_mulai = formatDate(status.tanggal_mulai);
        status.tanggal_akhir = formatDate(status.tanggal_akhir);

        new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenisBeasiswas)=>{
            status.jenis_beasiswas = jenisBeasiswas

            new Status().periode(status.periode_id, (err, periode)=>{
                status.periode = periode

                new Periode().all((periodes) => {
                    new JenisBeasiswa().all((jenisBeasiswas) => {
                        res.render('status/edit', {
                            status: status,
                            periodes: periodes,
                            jenisBeasiswas: jenisBeasiswas
                        })
                    })
                })
            })
        })
    })
}

const update = (req, res) => {
    const status = {
        id: req.body.id,
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